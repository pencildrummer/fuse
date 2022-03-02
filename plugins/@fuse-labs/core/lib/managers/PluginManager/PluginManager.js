import path from 'path'
import signale from 'signale';
import fs from 'fs-extra'
import { SYSTEM_BASE_PATH, PLUGINS_BASE_PATH } from '../../constants.js';
import Plugin from '../../models/plugins/Plugin/Plugin.js';
import chalk from 'chalk';

const ACTIVE_PLUGINS_PATH = path.resolve(path.join(SYSTEM_BASE_PATH, 'active_plugins.json'))

const __SYSTEM_PLUGIN_NAMES__ = Object.freeze([
  '@fuse-labs/core',
  '@fuse-labs/core-ui',
])

class PluginManager {

  get SYSTEM_PLUGIN_NAMES() {
    return __SYSTEM_PLUGIN_NAMES__
  }

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

    // Load active plugin names
    this.getActivePluginsNames()

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
    signale.start('Retrieving names list of active plugin')
    // Get list of active plugins
    let content = fs.readFileSync(ACTIVE_PLUGINS_PATH)
    
    // Set on singleton instance
    this._activePluginsNames = [
      ...__SYSTEM_PLUGIN_NAMES__,
      ...(JSON.parse(content)?.data || []),
    ]
  }

  activate(pluginName) {
    this.setPluginActive(pluginName, true)
  }

  deactivate(pluginName) {
    this.setPluginActive(pluginName, false)
  }

  /**
   * Private
   */

  setPluginActive(name, active) {
    // Check plugin is in installed plugins
    let plugin = this.getPlugin(name)
    if (!plugin) {
      throw new Error('Trying to change active state for a plugin not installed', name)
    }

    // Check plugin is not a system one
    if (plugin.system) {
      throw new Error('Trying to deactivate system plugin', plugin.name)
    }

    // Update system activet list file, later will be moved onto Plugin class

    if (active) {
      this._activePluginsNames.push(name)
    } else {
      this._activePluginsNames = this._activePluginsNames.filter(activePluginName => activePluginName != name)
    }

    // Remove system plugin names before storing list on file system
    const storedActivePluginNames = this._activePluginsNames
      .filter(name => !__SYSTEM_PLUGIN_NAMES__.includes(name))

    // And update in memory list
    fs.writeFileSync(ACTIVE_PLUGINS_PATH, JSON.stringify({
      "data": storedActivePluginNames
    }, null, 2))

    signale.success(`Changed plugin ${chalk.magenta(plugin.name)} active state to ${active ? chalk.greenBright('active') : chalk.redBright('not active')}`)
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