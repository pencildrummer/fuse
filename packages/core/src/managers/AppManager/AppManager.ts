import { AppDataType } from "@fuse-labs/types";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";
import {
  ConfigManager,
  ControllerManager,
  DeviceManager,
  PluginManager,
  ProfileManager,
} from "../index.js";

let instance: AppManager;

class AppManager extends BaseManager {
  constructor() {
    super();

    if (instance)
      throw new Error("Created new shared ConfigManager is not permitted");
    instance = this;
  }

  async init() {
    await ConfigManager.init();
    await ProfileManager.init();
    await ControllerManager.init();
    await DeviceManager.init();
    await PluginManager.init();
  }

  get data(): AppDataType {
    return {
      devices: DeviceManager.devices,
      plugins: PluginManager.plugins,
      profiles: ProfileManager.profiles,
      config: ConfigManager.config,
    };
  }
}

const manager = getProxiedManager(new AppManager());
export default manager;
