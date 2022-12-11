import { Device, PluginDataType, PluginInterface } from "@fuse-labs/types";
import { camelcase } from "varname";
import PluginManager from "../../../managers/PluginManager/PluginManager.js";
import { CoreSocket, DeviceSocket } from "../../../socket-server.js";
import { DeviceType } from "../../devices/index.js";

export default class Plugin<DS extends DeviceSocket = DeviceSocket>
  implements PluginInterface
{
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

    // Call provision if any
    if (typeof this.provision == "function") {
      this.provision();
    }
  }

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

  initDeviceSocket(socket: DS) {
    // To be implemented by subsclass
    console.warn("initDeviceSocket did nothing on", this.constructor.name);
  }
}
