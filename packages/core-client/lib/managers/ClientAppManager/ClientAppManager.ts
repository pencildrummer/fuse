import ClientBaseManager from "../ClientBaseManager";
import getProxiedManager from "../getProxiedManager";
import {
  ClientDeviceManager,
  ClientPluginManager,
  ClientConfigManager,
} from "../index";

class ClientAppManager extends ClientBaseManager {
  async init() {
    await ClientConfigManager.init();
    await ClientDeviceManager.init();
    await ClientPluginManager.init();
  }
}

const clientAppManager = getProxiedManager(new ClientAppManager());
export default clientAppManager;
