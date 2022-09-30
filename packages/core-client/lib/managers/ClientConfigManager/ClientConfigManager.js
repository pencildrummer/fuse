class ClientConfigManager extends EventTarget {

  _initialized = false
  get initialized() { return this._initialized}

  _config = {}
  get config() { return this._config }

  constructor() {
    super()
  }

  init(fetchedConfigData) {
    // TODO - Parse and validate fetched data
    this._config = fetchedConfigData

    this._initialized = true
  }

  /* Accessor */

  get pluginsDirectory() { return this._config?.['pluginsDirectory'] }

}

class Singleton {
  constructor() {
    throw new Error('Use ClientConfigManager.shared instead')
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientConfigManager()
    }
    return Singleton.sharedInstance
  }
}
export default Singleton