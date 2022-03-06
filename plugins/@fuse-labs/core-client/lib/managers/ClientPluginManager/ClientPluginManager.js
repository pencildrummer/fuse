import ClientPlugin from '../../models/ClientPlugin/ClientPlugin'

class ClientPluginManager {

  _initialized = false
  get initialized() { return this._initialized}

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
    //
  }

  init(fetchedPluginsData) {
    // Map fetched data to generic client plugin
    // While mapping should match if a plugin with a certain pattern to be decided i matched
    // And so register the plugin not as a generic ClientPlugin but as a registered one
    this._plugins = fetchedPluginsData?.map(data => {
      let PluginClass = ClientPluginManager._registeredPlugins[data.name]
      if (PluginClass) {
        return new PluginClass(data)
      } else {
        return new ClientPlugin(data)
      }
    }) || []

    // Now when all the plugin has been mapped, we can call the provision method on it
    console.log('INIT MANAGER Plugins', this._plugins)
    this._initialized = true
  }

  static _registeredPlugins = {}
  /**
   * Use this method to register client plugins, call it before initializing the plugin manager
   * @param {} pluginInstance 
   */
  static registerPlugin(pluginName, pluginClass) {
    ClientPluginManager._registeredPlugins[pluginName] = pluginClass
  }

}

class Singleton {
  constructor() {
    throw new Error('Use ClienPluginManager.shared instead')
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientPluginManager()
    }
    return Singleton.sharedInstance
  }
}
// Copy static method to register plugin because we are exporting Singleton instance of ClientDeviceManager
// Maybe found a cleaner way later on
Singleton.registerPlugin = ClientPluginManager.registerPlugin
export default Singleton