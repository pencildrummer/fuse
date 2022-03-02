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
    this._plugins = fetchedPluginsData?.map(data => new ClientPlugin(data)) || []
    console.log('INIT MANAGER Plugins', this._plugins)
    this._initialized = true
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
export default Singleton