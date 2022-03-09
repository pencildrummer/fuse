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

  _initialized = false

  constructor() {
    //
  }

  async init() {
    if (this._initialized) 
      throw new Error('Trying to re-initialize PluginManager')

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
    this._plugins = await pluginNames.reduce( async (prev, pluginName) => {
      // Wait for previous plugin load process
      const plugins = await prev

      const pluginModule = await import(`${pluginName}/server`)
        .then(res => {
          if (!res.default) {
            throw new Error('Found module but no default export is found. Should export the plugin class.')
          }
          if (typeof res.default !== 'function') {
            throw new Error(`Default export of ${pluginName}/server is not a class`)
          }
          if (!(res.default.prototype instanceof Plugin)) {
            throw new Error(`Plugin class "${chalk.red(res.default.name)}" must extend "${chalk.bold(Plugin.name)}" from ${chalk.underline('@fuse-labs/core/server')}`)
          }
          signale.success(`${chalk.green(pluginName+'/server')}: module found, using "${chalk.green.bold(res.default.name)}" to initialize plugin`)
          return res
        }).catch(err => {
          signale.warn(`${chalk.yellow(pluginName+'/server')}: module not found, using generic Plugin class to initialize "${chalk.bold(pluginName)}"`)
          return null
        })

      let PluginClass = Plugin
      if (pluginModule?.default)
        PluginClass = pluginModule.default

      // Create Plugin instance for required pluginName
      let plugin = new PluginClass(pluginName)
      if (plugin) {
        plugins.push(plugin)
      }
      return plugins
    }, Promise.resolve([]))

    this._initialized = true
    
    signale.success('PluginManager is now ready')
  }

  /**
   * Used internally to retrieve list of plugin names active from system file 'active_plugins.json'.
   * You should use PluginManager.activePluginsNames for operations.
   * @returns List of active plugin names
   */
  getActivePluginsNames() {
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
      signale.note('New shared instance of PluginManager')
      Singleton.sharedInstance = new PluginManager();
    }
    return Singleton.sharedInstance;
  }

}

export default Singleton