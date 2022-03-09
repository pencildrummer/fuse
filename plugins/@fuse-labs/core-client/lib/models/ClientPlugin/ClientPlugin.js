import { object, string, boolean } from 'yup'
import { socket } from '../../socket'
import ClientPluginManager from '../../managers/ClientPluginManager/ClientPluginManager'

const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  version: string().required(),
  _settings: boolean().required(),
  _hasPages: boolean().required(),
  _hasTabs: boolean().required(),
  _hasSocket: boolean().required(),
  _hasDeviceSocket: boolean().required(),
  _fuse: object().required(),
  _active: boolean().required(),
  _system: boolean().required(),
})

const SCHEMA = object({
  name: string().required(),
  version: string().required(),
  fuse: object().required()
})

export default class ClientPlugin {

  name;
  version;

  _fuse;

  _settings = false;
  get settings() { return this._settings }

  _hasPages = false;
  get hasPages() { return this._hasPages }

  get url() {
    // Check url is manually provided or generate one based on plugin name
    return this._fuse.pagesUrl || this.name
  }

  _hasTabs = false;
  get hasTabs() { return this._hasTabs }

  get tabsUrl() {
    // Check url is manually provided or generate one based on plugin name
    return this._fuse.tabsUrl || this.name
  }

  _hasSocket = undefined;
  get hasSocket() { return this._hasSocket }

  _hasDeviceSocket = undefined;
  get hasDeviceSocket() { return this._hasDeviceSocket }

  _active = false;
  get active() {
    return this._active
  }

  _system
  get system() { return this._system }

  get deviceTypes() {
    return this._fuse.devices
  }

  get displayTitle() {
    return this._fuse.title || this.name
  }

  constructor(data) {
    // Set validated data on instance
    let pluginData = CONSTRUCTOR_SCHEMA.validateSync(data)
    Object.assign(this, pluginData)

    // Init plugin socket if needed
    if (this.hasSocket) {
      this.socket = socket(this.name)
    }

    // Provision plugin if provision() exists
    if (typeof this.provision === 'function') {
      this.provision()
    }
  }
  
}