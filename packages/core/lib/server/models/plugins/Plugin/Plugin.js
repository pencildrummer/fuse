import path from 'path'
import fs from 'fs-extra'
import { object, string } from 'yup'
import { PLUGINS_BASE_PATH } from '../../../constants.js'
import PluginManager from '../../../managers/PluginManager/PluginManager.js'
import signale from 'signale'
import { DeviceType } from '../../devices/index.js'

const PLUGIN_SCHEMA = object({
  name: string().required(),
  version: string().required(),
  // _fuse: object({
  //   url: string(),
  //   tabsUrl: string(),
  // })
})

export default class Plugin {

  name;
  version = '0.0.1'; // TODO - Make something to set automatically from package json?

  // _fuse;

  _settings = false;
  get settings() { return this._settings }

  /**
   * @deprecated to be removed, use components in client
   */
  _hasPages = false;
  get hasPages() { return this._hasPages }

  get url() {
    // Check url is manually provided or generate one based on plugin name
    return this.name
    //return this._fuse.pagesUrl || this.name
  }

  _hasTabs = false;
  get hasTabs() { return this._hasTabs }

  get tabsUrl() {
    // Check url is manually provided or generate one based on plugin name
    return this.name
    //return this._fuse.tabsUrl || this.name
  }

  get hasSocket() {
    // If the plugin instance is not being subclassed, do not check initSocket because is an empty implementation
    if (this.constructor === Plugin) return false
    return typeof this.initSocket === 'function'
  }

  get hasDeviceSocket() {
    // If the plugin instance is not being subclassed, do not check initDeviceSocket because is an empty implementation
    if (this.constructor === Plugin) return false
    return typeof this.initDeviceSocket === 'function' && this.deviceTypes?.length > 0
  }

  get active() {
    return PluginManager.shared.activePluginsNames.includes(this.name)
  }

  get system() {
    return PluginManager.shared.SYSTEM_PLUGIN_NAMES.includes(this.name)
  }

  // TODO - Improve this method, like default values, value for all devices, etc.
  get deviceTypes() {
    return DeviceType.ALL
  }

  constructor(name) {
    // Set name
    this.name = name

    // let packagePath = path.join(PLUGINS_BASE_PATH, name, 'package.json')
  
    // try {
    //   if (!fs.existsSync(packagePath)) {
    //     signale.error('No package found for', name)
    //     return null
    //   }
    // } catch (e) {
    //   signale.error('Error retrieving package for', name)
    //   return null
    // }

    // let info

    // try {
    //   info = fs.readFileSync(packagePath)
    //   info = JSON.parse(info)
    // } catch (e) {
    //   signale.error('Error reading package', e)
    //   return null
    // }

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

    // // Check has tab structure
    // if (fs.existsSync(path.join(PLUGINS_BASE_PATH, this.name, 'tabs', 'index.js'))) {
    //   this._hasTabs = true
    // }

    // Call provision if any
    if (typeof this.provision == 'function') {
      this.provision()
    }
  }

  toJSON() {
    return {
      ...this,
      deviceTypes: this.deviceTypes,
      _active: this.active,
      _system: this.system,
      _hasSocket: this.hasSocket,
      _hasDeviceSocket: this.hasDeviceSocket,
    }
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

  initSocket(socket) {
    // To be implemented by subsclass
    console.warn('initSocket did nothing on', this.constructor.name)
  }

  initDeviceSocket(socket) {
    // To be implemented by subsclass
    console.warn('initDeviceSocket did nothing on', this.constructor.name)
  }
  
}