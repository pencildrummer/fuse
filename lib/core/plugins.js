import fs from 'fs'
import path from 'path'
import signale from 'signale'
import chalk from 'chalk'
import { PLUGINS_BASE_PATH, SYSTEM_BASE_PATH } from './constants.js'

const SYSTEM_PLUGINS = [
  '@fuse-labs/core',
  '@fuse-labs/core-ui',
]

const ACTIVE_PLUGINS_PATH = path.resolve(path.join(SYSTEM_BASE_PATH, 'active_plugins.json'))

// Internal var to track active plugin names
let _activePluginsNames = getActivePluginsNames()

// Get all plugins upon require and make it available as export
const plugins = getPlugins()
export default plugins

export function getPlugin(name) {
  return plugins.find(plugin => plugin.name == name)
}

export function getActivePlugins() {
  return plugins.filter(plugin => plugin.fuse.isActive)
}

export function setPluginActive(name, activate) {

  // TODO - Check plugin is not a system one

  // Check plugin is in installed plugins
  let plugin = getPlugin(name)
  if (!plugin) {
    throw new Error('Trying to activate a plugin not installed', name)
  }

  // Set plugin as not active
  plugin.fuse.isActive = activate
  // Update system activet list file, later will be moved onto Plugin class
  updateActivePluginsNames()

  signale.success(`Changed plugin ${chalk.magenta(plugin.name)} active state to ${activate ? chalk.greenBright('active') : chalk.redBright('not active')}`)
}

/**
 * Internal
 */

function getPlugins() {
   // Get available plugins based on package presence
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
    // Get info for plugin (contains active status)
    let info = readPluginInfo(pluginName)
    if (info) {
      res.push(info)
    }
    return res
  }, [])
}

function readPluginInfo(name) {
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

  // Check has tab structure
  if (fs.existsSync(path.join(PLUGINS_BASE_PATH, name, 'tabs/index.js'))) {
    info.fuse.hasTabs = true
    // Check url is manually provided or generate one based on plugin name
    info.fuse.tabsUrl = info.fuse.tabsUrl || name
  } else if (info.fuse.tabsUrl) {
    signale.warn('Provided "tabsUrl" in ', chalk.magentaBright(info.name), ' but no "tabs/index.js" has be found.')
  }

  // Check plugin is active
  info.fuse.isActive = _activePluginsNames.includes(name)

  return info
}

/**
 * Used internally to retrieve list of plugin names active from system fild 'active_plugins.json'.
 * You should use _activePluginsNames for operations.
 * @returns List of active plugin names
 */
function getActivePluginsNames() {
  // Get list of active plugins
  let content = fs.readFileSync(ACTIVE_PLUGINS_PATH)
  
  return [
    ...SYSTEM_PLUGINS,
    ...(JSON.parse(content)?.data || []),
  ]
}

function updateActivePluginsNames() {
  // Remove system plugins, they are always active do not need to store
  // And update in memory list
  _activePluginsNames = plugins.filter(plugin => !SYSTEM_PLUGINS.includes(plugin))
    .map(plugin => plugin.fuse.isActive ? plugin.name : null).filter(Boolean)
  return fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify({
    "data": _activePluginsNames
  }, null, 2))
}