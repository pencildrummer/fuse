import path from 'path'
import signale from 'signale';
import fs from 'fs-extra'
import { SYSTEM_BASE_PATH, PLUGINS_BASE_PATH } from '../../constants.js';
import Plugin from '../../models/plugins/Plugin/Plugin.js';

const ACTIVE_PLUGINS_PATH = path.resolve(path.join(SYSTEM_BASE_PATH, 'active_plugins.json'))

const SYSTEM_PLUGIN_NAMES = Object.freeze([
  '@fuse-labs/core',
  '@fuse-labs/core-ui',
])

class PluginManager {

  _plugins = [];
  get plugins() { return this._plugins }

  _activePluginsNames = []
  get activePluginsNames() { return this._activePluginsNames }

  get activePlugins() {
    return this._plugins.filter(plugin => plugin.active)
  }

  getPlugin(name) {
    return this._plugins.find(plugin => plugin.name == name)
  }

  constructor() {
    signale.pending('Initializing PluginManager')

    // Init plugin manager
    // Get available installed plugins based on package presence
    let dirs = fs.readdirSync(PLUGINS_BASE_PATH)
    let scopes = dirs.filter(dir => dir.startsWith("@"))
    let scopedPlugins = scopes.flatMap( scope => 
      fs.readdirSync(path.join(PLUGINS_BASE_PATH, scope)).map(name => path.join(scope, name))
    )

    let pluginNames = [
      ...scopedPlugins,
      dirs.filter(d => !scopes.includes(d))
    ].flat()

    // Init Plugin(s) based on names and add it to the plugin manager store
    this._plugins = pluginNames.reduce( (plugins, pluginName) => {
      // Create Plugin instance for required pluginName
      let plugin = new Plugin(pluginName)
      if (plugin) {
        plugins.push(plugin)
      }
      return plugins
    }, [])
  }

  /**
   * Used internally to retrieve list of plugin names active from system file 'active_plugins.json'.
   * You should use PluginManager.activePluginsNames for operations.
   * @returns List of active plugin names
   */
  getActivePluginsNames() {
    // Get list of active plugins
    let content = fs.readFileSync(activepl)
    
    // Set on singleton instance
    this._activePluginsNames = [
      ...SYSTEM_PLUGIN_NAMES,
      ...(JSON.parse(content)?.data || []),
    ]
  }

  activate(plugin) {
    this.setPluginActive(plugin.name, true)
  }

  deactivate(plugin) {
    this.setPluginActive(plugin.name, false)
  }

  /**
   * Private
   */

  setPluginActive(name, active) {

    // TODO - Check plugin is not a system one
  
    // Check plugin is in installed plugins
    let plugin = getPlugin(name)
    if (!plugin) {
      throw new Error('Trying to change active state for a plugin not installed', name)
    }
  
    // Set plugin as not active
    plugin.fuse.isActive = active
    // Update system activet list file, later will be moved onto Plugin class
    updateActivePluginsNames()
  
    signale.success(`Changed plugin ${chalk.magenta(plugin.name)} active state to ${active ? chalk.greenBright('active') : chalk.redBright('not active')}`)
  }

  updateActivePluginsNames() {
    // Remove system plugins, they are always active do not need to store
    // And update in memory list
    this._activePluginsNames = plugins.filter(plugin => !SYSTEM_PLUGIN_NAMES.includes(plugin))
      .map(plugin => plugin.fuse.isActive ? plugin.name : null).filter(Boolean)
    
    return fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify({
      "data": this._activePluginsNames
    }, null, 2))
  }

}

// Export shared manager
class Singleton {

  constructor() {
    throw new Error('User PluginManager.shared instead')
  }

  static get shared() {
    if (!Singleton.sharedInstance) {
      signale.star('New shared instance')
      Singleton.sharedInstance = new PluginManager();
    }
    return Singleton.sharedInstance;
  }

}

export default Singleton