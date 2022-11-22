import Plugin from "../../models/plugins/Plugin/Plugin.js";
type PluginInfo = {
    name: string;
    path: string;
    active?: Plugin["active"];
};
declare class PluginManager {
    get SYSTEM_PLUGIN_NAMES(): string[];
    private _plugins;
    get plugins(): {
        [key: string]: Plugin;
    };
    private _activePluginsNames;
    get activePluginsNames(): string[];
    get activePlugins(): Plugin[];
    getPlugin(name: Plugin["name"]): Plugin;
    private _initialized;
    constructor();
    init(): Promise<void>;
    loadSystemPlugin(systemPluginInfo: PluginInfo): Promise<any>;
    loadInstalledPlugin(pluginInfo: PluginInfo): Promise<void | Plugin>;
    /** Get all plugins info, including system plugins */
    getPluginsListInfo(): {
        [key: string]: PluginInfo;
    };
    /** Get installed plugin info, without system plugins */
    getInstalledPluginsListInfo(): {
        [key: string]: PluginInfo;
    };
    activate(pluginName: Plugin["name"]): void;
    deactivate(pluginName: Plugin["name"]): void;
    /**
     * Private
     */
    setPluginActive(name: Plugin["name"], active: Plugin["active"]): void;
}
declare class Singleton {
    private static sharedInstance;
    constructor();
    static get shared(): PluginManager;
}
export default Singleton;
//# sourceMappingURL=PluginManager.d.ts.map