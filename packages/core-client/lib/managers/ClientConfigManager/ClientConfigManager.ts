import { ConfigDataType } from "@fuse-labs/types";
import ClientBaseManager from "../ClientBaseManager";
import getProxiedManager from "../getProxiedManager";

class ClientConfigManager extends ClientBaseManager {
  private _config: ConfigDataType;
  get config() {
    return this._config;
  }

  async init() {}

  configureWithData(fetchedConfigData: ConfigDataType) {
    // TODO - Parse and validate fetched data
    this._config = fetchedConfigData;
  }

  /* Accessor */

  get pluginsDirectory() {
    return this._config.pluginsDirectory;
  }
}

const manager = getProxiedManager(new ClientConfigManager());
export default manager;
