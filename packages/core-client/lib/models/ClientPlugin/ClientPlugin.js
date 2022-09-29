import { object, string, boolean, array } from "yup";
import { socket } from "../../socket";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import ClientDeviceType from "../ClientDeviceType/ClientDeviceType";

const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  _version: string().required(),
  deviceTypes: array().required(),
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
  // get deviceTypes() {

  //   // if (this._fuse.devices == '*') return Object.values(ClientDeviceType)
  //   // return this._fuse.devices
  // }

  get displayTitle() {
    return this.name;
    //return this._fuse.title || this.name
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

    // Provision plugin if provision() exists
    if (typeof this.provision === "function") {
      this.provision();
    }
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
}
