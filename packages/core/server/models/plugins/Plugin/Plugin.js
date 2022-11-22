import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { camelcase } from "varname";
import PluginManager from "../../../managers/PluginManager/PluginManager.js";
import { DeviceType } from "../../devices/index.js";
export default class Plugin {
    get settings() {
        return this._settings;
    }
    get url() {
        // Check url is manually provided or generate one based on plugin name
        return this.name;
        //return this._fuse.pagesUrl || this.name
    }
    get hasTabs() {
        return this._hasTabs;
    }
    get tabsUrl() {
        // Check url is manually provided or generate one based on plugin name
        return this.name;
        //return this._fuse.tabsUrl || this.name
    }
    get hasSocket() {
        // If the plugin instance is not being subclassed, do not check initSocket because is an empty implementation
        if (this.constructor === Plugin)
            return false;
        return typeof this.initSocket === "function";
    }
    get hasDeviceSocket() {
        // If the plugin instance is not being subclassed, do not check initDeviceSocket because is an empty implementation
        if (this.constructor === Plugin)
            return false;
        return (typeof this.initDeviceSocket === "function" &&
            this.deviceTypes?.length > 0);
    }
    get active() {
        return PluginManager.shared.activePluginsNames.includes(this.name);
    }
    get system() {
        return PluginManager.shared.SYSTEM_PLUGIN_NAMES.includes(this.name);
    }
    // TODO - Improve this method, like default values, value for all devices, etc.
    get deviceTypes() {
        return DeviceType.ALL;
    }
    constructor(name, installPath) {
        this.version = "0.0.0";
        this._settings = false;
        this._hasTabs = false;
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
            signale.info(`Setting plugin info from package.json for ${name}`);
            // Set version from package if not manually set
            this.version = packageInfo.version;
        }
        else {
            signale.warn(`No package.json found for ${name}. Skipping retrieving info such as version from package.json.`);
            signale.warn("    Searched at", packagePath);
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
    toJSON() {
        return {
            // ...this,
            ...JSON.parse(JSON.stringify(this)),
            deviceTypes: this.deviceTypes,
            active: this.active,
            system: this.system,
            hasSocket: this.hasSocket,
            hasDeviceSocket: this.hasDeviceSocket,
            // path: this.path,
            // libraryName: this._libraryName,
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
    initSocket(socket) {
        // To be implemented by subsclass
        console.warn("initSocket did nothing on", this.constructor.name);
    }
    initDeviceSocket(socket) {
        // To be implemented by subsclass
        console.warn("initDeviceSocket did nothing on", this.constructor.name);
    }
}
