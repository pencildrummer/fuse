import { ConfigDataType } from "@fuse-labs/types";

class ClientConfigManager extends EventTarget {
  private _initialized: boolean = false;
  get initialized() {
    return this._initialized;
  }

  private _config: ConfigDataType;
  get config() {
    return this._config;
  }

  constructor() {
    super();
  }

  init(fetchedConfigData: ConfigDataType) {
    // TODO - Parse and validate fetched data
    this._config = fetchedConfigData;

    this._initialized = true;
  }

  /* Accessor */

  get pluginsDirectory() {
    return this._config.pluginsDirectory;
  }
}

class Singleton {
  static sharedInstance: ClientConfigManager;
  constructor() {
    throw new Error("Use ClientConfigManager.shared instead");
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientConfigManager();
    }
    return Singleton.sharedInstance;
  }
}
export default Singleton;
