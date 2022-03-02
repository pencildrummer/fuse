import fs from 'fs'
import path from 'path'
import signale from 'signale'
import chalk from 'chalk'
import { PLUGINS_BASE_PATH, SYSTEM_BASE_PATH } from './constants.js'

const ACTIVE_PLUGINS_PATH = path.resolve(path.join(SYSTEM_BASE_PATH, 'active_plugins.json'))

// Internal var to track active plugin names
let _activePluginsNames = getActivePluginsNames()

// Get all plugins upon require and make it available as export
export const plugins = getPlugins()

export function getPlugin(name) {
  return plugins.find(plugin => plugin.name == name)
}

export function getActivePlugins() {
  return plugins.filter(plugin => plugin.active)
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
    // Create Plugin instance for required pluginName
    let plugin = new FusePlugin(pluginName)
    if (plugin) {
      res.push(plugin)
    }
    return res
  }, [])
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