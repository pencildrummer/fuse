import { object, string, boolean, array } from "yup";
import { socket } from "../../socket";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import ClientDeviceManager from "../../managers/ClientDeviceManager/ClientDeviceManager";
import ClientDeviceType from "../ClientDeviceType/ClientDeviceType";
import lodash from "lodash";

const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  _version: string().required(),
  _deviceTypes: array().required(),
  _settings: boolean(),
  _hasPages: boolean(),
  _hasTabs: boolean(),
  _hasSocket: boolean(),
  _hasDeviceSocket: boolean(),
  //_fuse: object().required(),
  _active: boolean(),
  _system: boolean(),
});

const SCHEMA = object({
  name: string().required(),
  version: string().required(),
  fuse: object().required(),
});

export default class ClientPlugin {
  name;

  _version;
  get version() {
    return this._version;
  }

  //_fuse;

  _settings = false;
  get settings() {
    return this._settings;
  }

  _hasPages = false;
  get hasPages() {
    return this._hasPages;
  }

  get url() {
    // Check url is manually provided or generate one based on plugin name
    return this.name;
    //return this._fuse.pagesUrl || this.name
  }

  _hasTabs = false;
  get hasTabs() {
    return this._hasTabs;
  }

  get tabsUrl() {
    // Check url is manually provided or generate one based on plugin name
    return this.name;
    //return this._fuse.tabsUrl || this.name
  }

  _hasSocket = undefined;
  get hasSocket() {
    return this._hasSocket;
  }

  _hasDeviceSocket = undefined;
  get hasDeviceSocket() {
    return this._hasDeviceSocket;
  }

  _active = false;
  get active() {
    return this._active;
  }

  _system = false;
  get system() {
    return this._system;
  }

  get icon() {
    return QuestionMarkIcon;
  }

  _deviceTypes = [];
  get deviceTypes() {
    return this._deviceTypes;
  }

  get displayTitle() {
    return this.name;
    //return this._fuse.title || this.name
  }

  // Retrieve device compatible with plugin
  get devices() {
    return ClientDeviceManager.shared.devices.filter((device) =>
      this.deviceTypes.includes(device.profile.type)
    );
  }

  constructor(data) {
    if (!data) {
      throw new Error(`Missing data to initialize plugin`);
    }

    // Set validated data on instance
    let pluginData = CONSTRUCTOR_SCHEMA.validateSync(data);
    Object.assign(this, pluginData);

    // Init plugin socket if needed
    if (this.hasSocket) {
      this.socket = socket(this.name);
    }

    // Automatically provision plugin on initialization
    //this.provision();
  }

  /**
   * Returns dynamic plugin components
   */
  components() {
    return {};
  }

  /**
   * Returns dynamic plugin components for device
   * @param {ClientDevice} device
   * @returns
   */
  deviceComponents(device) {
    return {};
  }

  /**
   * Called each time a plugin is installed. Called also on ClientManager "updatedDevices".
   * Call super.provision() when subclasses
   */
  provision() {
    if (!this.active) {
      throw new Error("Trying to provision inactive plugin");
    }

    //

    // TODO: Move into specific method and decide if keep in this class or in ClientPluginManager

    // Create device socket if needed
    if (this.hasDeviceSocket) {
      this.devices?.forEach((device) => {
        let keyPath = this.name
          .split("/")
          .map((key) => lodash.camelCase(key))
          .join(".");
        if (!lodash.get(device, "sockets." + keyPath)) {
          let pluginDeviceSocket = socket(`device:${device.id}/${this.name}`);
          lodash.set(device, "sockets." + keyPath, pluginDeviceSocket);
        }
      });
    }

    // To be implemented in subclasses
  }
}
