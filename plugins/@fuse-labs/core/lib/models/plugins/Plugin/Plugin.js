import path from 'path'
import fs from 'fs-extra'
import { object, string } from 'yup'
import { PLUGINS_BASE_PATH } from '../../../constants.js'
import PluginManager from '../../../managers/PluginManager/PluginManager.js'
import signale from 'signale'

const PLUGIN_SCHEMA = object({
  name: string().required(),
  version: string().required(),
  _fuse: object({
    url: string(),
    tabsUrl: string(),
  })
})

export default class Plugin {

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

  _hasSocket = false;
  get hasSocket() { return this._hasSocket }

  get active() {
    return PluginManager.shared.activePluginsNames.includes(this.name)
  }

  get system() {
    return PluginManager.shared.SYSTEM_PLUGIN_NAMES.includes(this.name)
  }

  get deviceTypes() {
    return this._fuse.devices
  }

  constructor(name) {
    let packagePath = path.join(PLUGINS_BASE_PATH, name, 'package.json')
  
    try {
      if (!fs.existsSync(packagePath)) {
        signale.error('No package found for', name)
        return null
      }
    } catch (e) {
      signale.error('Error retrieving package for', name)
      return null
    }

    let info

    try {
      info = fs.readFileSync(packagePath)
      info = JSON.parse(info)
    } catch (e) {
      signale.error('Error reading package', e)
      return null
    }

    // Add fuse key to safely add custom settings if not provided by package.json
    info._fuse = { ...info.fuse }

    // Validate package
    let pluginData = PLUGIN_SCHEMA.validateSync(info)

    // TODO - Improve this
    // Clear .fuse to be set onto ._fuse
    delete pluginData.fuse

    // Apply info to Plugin instance
    Object.assign(this, pluginData)

    // Check has setting page
    if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'settings/index.js'))) {
      this._settings = true
    }

    // Check has pages
    if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'pages', 'index.js'))) {
      this._hasPages = true
    }

    // Check has tab structure
    if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'tabs', 'index.js'))) {
      this._hasTabs = true
    }

    // Check has socket

    // Check exists socket.js file in server dir in plugin
    if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'server', 'socket.js'))) {
      // Set flag value
      this._hasSocket = true
    }

    // Call provision if any
    if (typeof this.provision == 'function') {
      this.provision()
    }
  }

  toJSON() {
    return {
      ...this,
      _active: this.active,
      _system: this.system
    }
  }
  
}