import { Device, PluginDataType, PluginInterface } from "@fuse-labs/types";
import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { camelcase } from "varname";
import { logger } from "../../../logger.js";
import PluginManager from "../../../managers/PluginManager/PluginManager.js";
import { CoreSocket, DeviceSocket } from "../../../socket-server.js";
import { DeviceType } from "../../devices/index.js";

export default class Plugin implements PluginInterface {
  name: string;
  displayName: string;
  path: string;
  version = "0.0.0";
  libraryName: string;

  _settings = false;
  get settings() {
    return this._settings;
  }

  get url() {
    // Check url is manually provided or generate one based on plugin name
    return this.name;
    //return this._fuse.pagesUrl || this.name
  }

  get tabsUrl() {
    // Check url is manually provided or generate one based on plugin name
    return this.name;
    //return this._fuse.tabsUrl || this.name
  }

  get hasSocket() {
    // If the plugin instance is not being subclassed, do not check initSocket because is an empty implementation
    if (this.constructor === Plugin) return false;
    return typeof this.initSocket === "function";
  }

  get hasDeviceSocket() {
    // If the plugin instance is not being subclassed, do not check initDeviceSocket because is an empty implementation
    if (this.constructor === Plugin) return false;
    return (
      typeof this.initDeviceSocket === "function" &&
      this.deviceTypes?.length > 0
    );
  }

  get active() {
    return PluginManager.activePluginsNames.includes(this.name);
  }

  get system() {
    return PluginManager.SYSTEM_PLUGIN_NAMES.includes(this.name);
  }

  // TODO - Improve this method, like default values, value for all devices, etc.
  get deviceTypes() {
    return DeviceType.ALL as Device.Profile.Type[];
  }

  constructor(name: string, installPath: string) {
    // Set name
    this.name = name;

    // Set default display name as plugin name
    this.displayName = name;

    // Set installation path
    this.path = installPath;

    // Set default library name
    this.libraryName = camelcase(this.name);

    let packagePath = path.join(this.path, "package.json");

    if (fs.existsSync(packagePath)) {
      let packageInfo = fs.readJsonSync(packagePath);

      logger.info(`Setting plugin info from package.json for ${name}`);

      // Set version from package if not manually set
      this.version = packageInfo.version;
    } else {
      logger.warn(
        `No package.json found for ${name}. Skipping retrieving info such as version from package.json.`
      );
      logger.warn("    Searched at", packagePath);
    }

    // // Add fuse key to safely add custom settings if not provided by package.json
    // info._fuse = { ...info.fuse }

    // // Validate package
    // let pluginData = PLUGIN_SCHEMA.validateSync(info)

    // // TODO - Improve this
    // // Clear .fuse to be set onto ._fuse
    // delete pluginData.fuse

    // // Apply info to Plugin instance
    // Object.assign(this, pluginData)

    // Check has setting page
    // if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'pages', 'settings.js'))) {
    //   this._settings = true
    // }

    // // Check has pages
    // if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'pages', 'index.js'))) {
    //   this._hasPages = true
    // }

    // Deprecated
    // // Check has tab structure
    // if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'tabs', 'index.js'))) {
    //   this._hasTabs = true
    // }

    // Call provision if any
    if (typeof this.provision == "function") {
      this.provision();
    }
  }

  // TODO: Set DeviceDataType as return type
  toJSON(): PluginDataType {
    return {
      // ...this,
      name: this.name,
      displayName: this.displayName,
      path: this.path,
      version: this.version,

      libraryName: this.libraryName,
      settings: this.settings,

      deviceTypes: this.deviceTypes,
      active: this.active,
      system: this.system,
      hasSocket: this.hasSocket,
      hasDeviceSocket: this.hasDeviceSocket,
    };
  }

  /**
   * Called after plugin initialization
   */
  provision() {
    // To be subclassed
  }

  /**
   * Socket initialization
   */

  initSocket(socket: CoreSocket) {
    // To be implemented by subsclass
    console.warn("initSocket did nothing on", this.constructor.name);
  }

  initDeviceSocket(socket: DeviceSocket) {
    // To be implemented by subsclass
    console.warn("initDeviceSocket did nothing on", this.constructor.name);
  }
}
