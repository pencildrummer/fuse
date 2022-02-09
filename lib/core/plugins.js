import fs from 'fs'
import path from 'path'
import signale from 'signale'
import chalk from 'chalk'
import { ACTIVE_PLUGINS_PATH, PLUGINS_BASE_PATH, SYSTEM_BASE_PATH, SYSTEM_PLUGINS } from './constants.js'

export function getPlugins() {
  let dirs = fs.readdirSync(PLUGINS_BASE_PATH)
  let scopes = dirs.filter(dir => dir.startsWith("@"))
  let scopedPlugins = scopes.flatMap( scope => 
    fs.readdirSync(path.join(PLUGINS_BASE_PATH, scope)).map(name => path.join(scope, name))
  )

  let pluginNames = [
    ...scopedPlugins,
    dirs.filter(d => !scopes.includes(d))
  ].flat()

  return pluginNames.reduce( (res, pluginName) => {
    // Get info for plugin
    let info = getPluginInfo(pluginName)
    if (info) {
      res.push(info)
    }
    return res
  }, [])
}

export function getPluginInfo(name, {
  checkActive = true
} = {}) {
  let packagePath = path.join(PLUGINS_BASE_PATH, name, 'package.json')
  
  try {
    if (!fs.existsSync(packagePath)) {
      signale.error('No package found for', name)
      return null
    }
  } catch (e) {
    signale.error('Error retrieving package for', name)
    return null
  }

  let info

  try {
    info = fs.readFileSync(packagePath)
    info = JSON.parse(info)
  } catch (e) {
    signale.error('Error reading package', e)
    return null
  }

  // Add fuse key to safely add custom settings if not provided by package.json
  info.fuse = { ...info.fuse }

  // Check has setting page
  if (fs.existsSync(path.join(PLUGINS_BASE_PATH, name, 'settings/index.js'))) {
    info.fuse.settings = true
  }

  // Check plugin is system
  info.fuse.system = SYSTEM_PLUGINS.includes(info.name)

  // Check has pages
  if (fs.existsSync(path.join(PLUGINS_BASE_PATH, name, 'pages/index.js'))) {
    info.fuse.hasPages = true
    // Check url is manually provided or generate one based on plugin name
    info.fuse.url = info.fuse.pagesUrl || name
  } else if (info.fuse.pagesUrl) {
    signale.warn('Provided "pagesUrl" in ', chalk.magentaBright(info.name), ' but no "pages/index.js" has be found.')
  }

  // Check plugin is active
  if (checkActive) {
    info.fuse.isActive = getActivePlugins().includes(name)
  }

  return info
}

export function getActivePlugins() {
  // Get list of active plugins
  let content = fs.readFileSync(ACTIVE_PLUGINS_PATH)
  
  return [
    ...SYSTEM_PLUGINS,
    ...(JSON.parse(content)?.data || []),
  ]
}

export function getActivePluginsWithInfo() {
  return getActivePlugins()
    .map(pluginName => getPluginInfo(pluginName))
}

function setActivePlugins(plugins) {
  // TODO - Validate plugins must be an array
  let json = {
    // Remove SYSTEM_PLUGINS from the array to store on disk
    "data": plugins.filter(plugin => !SYSTEM_PLUGINS.includes(plugin))
  }
  return fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify(json, null, 2))
}

export function setPluginActive(name, activate) {

  // TODO - Check plugin is not a system one

  // Check plugin is in installed plugins
  let plugins = getPlugins()
  let plugin = plugins.find(plugin => plugin.name == name)
  if (!plugin) {
    throw new Error('Trying to active a plugin not installed', name)
  }

  // Get list of active plugins
  let activePlugins = getActivePlugins()

  if (activate) {
    if (activePlugins.includes(plugin.name)) {
      signale.warn('Plugin already active. Skipping.')
      return
    }
    activePlugins.push(plugin.name)

    // Save on system the active plugins
    setActivePlugins(activePlugins)

    signale.success('Activated plugin', plugin.name)
  } else {
    activePlugins = activePlugins.filter(activePluginName => activePluginName != plugin.name)
    setActivePlugins(activePlugins)
    signale.info('Deactivated plugin', plugin.name)
  }
}