import { object, string, boolean } from 'yup'
import { socket } from '../../socket'
import ClientPluginManager from '../../managers/ClientPluginManager/ClientPluginManager'

const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  version: string().required(),
  _settings: boolean().required(),
  _hasPages: boolean().required(),
  _url: string(),
  _hasTabs: boolean().required(),
  _tabsUrl: string(),
  _hasSocket: boolean().required(),
})

const SCHEMA = object({
  name: string().required(),
  version: string().required(),
  fuse: object().required()
})

export default class ClientPlugin {

  name;
  version;

  _settings = false;
  get settings() { return this._settings }

  _hasPages = false;
  get hasPages() { return this._hasPages }

  _url = undefined
  get url() { return this._url }

  _hasTabs = false;
  get hasTabs() { return this._hasTabs }

  _tabsUrl = undefined;
  get tabsUrl() { return this._tabsUrl }

  _hasSocket = undefined;
  get hasSocket() { return this._hasSocket }

  get active() {
    ClientPluginManager.shared.activePluginsNames.includes(this.name)
  }

  get system() {
    return PluginManager.shared.SYSTEM_PLUGIN_NAMES.includes(this.name)
  }

  constructor(data) {
    let pluginData = CONSTRUCTOR_SCHEMA.validateSync(data)
    Object.assign(this, pluginData)

    // Init plugin socket if needed
    if (this.hasSocket) {
      this.socket = socket(this.name)
    }
  }
  
}