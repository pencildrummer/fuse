import ClientPlugin from "../../models/ClientPlugin/ClientPlugin";

class ClientPluginManager {
  _initialized = false;
  get initialized() {
    return this._initialized;
  }

  _loading = false;
  get loading() {
    return this._loading;
  }

  _plugins = [];
  get plugins() {
    return this._plugins;
  }

  _activePluginsNames = [];
  get activePluginsNames() {
    return this._activePluginsNames;
  }

  get activePlugins() {
    return this._plugins.filter((plugin) => plugin.active);
  }

  getPlugin(name) {
    return this._plugins.find((plugin) => plugin.name == name);
  }

  constructor() {
    //
  }

  async init(fetchedPluginsData) {
    this._loading = true;

    // Map fetched data to generic client plugin
    // While mapping should match if a plugin with a certain pattern to be decided i matched
    // And so register the plugin not as a generic ClientPlugin but as a registered one
    if (fetchedPluginsData) {
      this._plugins = await Promise.all(
        fetchedPluginsData
          ?.filter((data) => {
            // TODO: Change later
            // Skipping system for now
            return !data._system;
          })
          .map(async (data) => {
            console.log("Plugin data", data);

            // TODO - Later on make dynamic import on installed plugins, we need a plugin install system to be implemente
            try {
              const base = "http://localhost:3000/system";
              //const importPath = `${data._path}/lib/client/index.js`
              const pluginDir = data._path.split("/").pop();
              //const importPath = 'file:///Users/pencildrummer/Sites/fuse/apps/client/public/test.js'
              // const test = await import(/* webpackIgnore: true */ `./${data.name}.js`)
              // console.log('TEST', test)
              const importPath = `${base}/${pluginDir}/dist-client/main.js`;
              console.log(
                `Registering plugin '${data.name}' from '${importPath}'`
              );
              // IMPORTANT: The magic is to skip webpack bundling for await import! (with the webpackIgnore rule)
              const pluginImported = await import(
                /* webpackIgnore: true */ `${importPath}`
              )
                .then((res) => {
                  console.log("Imported");
                  // Access loaded plugin from window because we are loading from UMD
                  // TODO: Investigate bettere this loading process
                  return window[data._libraryName];
                })
                .catch((err) => {
                  console.error(err);
                  return null;
                });

              if (pluginImported) {
                // Get the default implementation
                const { default: pluginClass } = pluginImported;
                // Register plugin class
                ClientPluginManager.registerPlugin(data.name, pluginClass);
              }
            } catch (err) {
              console.error(err);
              throw err;
            }

            let PluginClass = ClientPluginManager._registeredPlugins[data.name];
            if (PluginClass) {
              return new PluginClass(data);
            } else {
              return new ClientPlugin(data);
            }
          })
      );
    } else {
      this._plugins = [];
    }

    // Now when all the plugin has been mapped, we can call the provision method on it
    console.log("INIT MANAGER Plugins", this._plugins);
    this._initialized = true;
    this._loading = false;
  }

  static _registeredPlugins = {};
  /**
   * Use this method to register client plugins, call it before initializing the plugin manager
   * @param {} pluginInstance
   */
  static registerPlugin(pluginName, pluginClass) {
    ClientPluginManager._registeredPlugins[pluginName] = pluginClass;
  }
}

class Singleton {
  constructor() {
    throw new Error("Use ClienPluginManager.shared instead");
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientPluginManager();
    }
    return Singleton.sharedInstance;
  }
}
// Copy static method to register plugin because we are exporting Singleton instance of ClientDeviceManager
// Maybe found a cleaner way later on
Singleton.registerPlugin = ClientPluginManager.registerPlugin;
export default Singleton;
