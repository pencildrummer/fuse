import fs, { existsSync } from 'fs'
import path from 'path'
import signale from 'signale'
import { ACTIVE_PLUGINS_PATH, PLUGINS_BASE_PATH, SYSTEM_BASE_PATH, SYSTEM_PLUGINS } from './constants'

export async function getPlugins() {
  let dirs = await fs.promises.readdir(PLUGINS_BASE_PATH).catch(err => console.error(err))
  let scopes = dirs.filter(dir => dir.startsWith("@"))
  let scopedPlugins = scopes.flatMap( scope => 
    fs.readdirSync(path.join(PLUGINS_BASE_PATH, scope)).map(name => path.join(scope, name))
  )

  let pluginNames = [
    ...scopedPlugins,
    dirs.filter(d => !scopes.includes(d))
  ].flat()

  return await pluginNames.reduce(async (result, pluginName) => {
    let res = await result
    // Get info for plugin
    let info = await getPluginInfo(pluginName)
    if (info) {
      res.push(info)
    }
    return res
  }, [])
}

export async function getPluginInfo(name) {
  let packagePath = path.join(PLUGINS_BASE_PATH, name, 'package.json')
  
  try {
    if (!existsSync(packagePath)) {
      signale.error('No package found for', name)
      return null
    }
  } catch (e) {
    signale.error('Error retrieving package for', name)
    return null
  }

  let info = await fs.promises.readFile(packagePath)
    .then(res => JSON.parse(res))
    .catch(e => signale.error('Error reading package', e))

  // Add fuse key to safely add custom settings if not provided by package.json
  info.fuse = { ...info.fuse }

  // Check has setting page
  if (existsSync(path.join(PLUGINS_BASE_PATH, name, 'settings/index.js'))) {
    info.fuse.settings = true
  }

  // Check plugin is system
  info.fuse.system = SYSTEM_PLUGINS.includes(info.name)

  // TODO - Check plugin is active

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

function setActivePlugins(plugins) {
  // TODO - Validate plugins must be an array
  let json = {
    "data": plugins
  }
  return fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify(json, null, 2))
}

export async function setPluginActive(name, activate) {

  // TODO - Check plugin is not a system one

  // Check plugin is in installed plugins
  let plugins = await getPlugins()
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
    fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify(activePlugins, null, 2))
    signale.info('Deactivated plugin', plugin.name)
  }
}