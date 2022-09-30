import ClientDeviceManager from "../ClientDeviceManager/ClientDeviceManager";

class ClientPluginManager extends EventTarget {
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
    super();

    // Add listener to provision plugins on each ClientDeviceManager updateDevices event
    const handler = (_) => {
      console.log("Handling updatedDevices");
      this.provisionPlugins();
    };
    ClientDeviceManager.shared.addEventListener("updatedDevices", handler);
  }

  async init(installedPluginsData) {
    this._loading = true;

    console.log("Plugins data:", installedPluginsData);
    console.log("Already registered:", ClientPluginManager._registeredPlugins);

    // Map fetched data to generic client plugin
    // While mapping should match if a plugin with a certain pattern to be decided i matched
    // And so register the plugin not as a generic ClientPlugin but as a registered one
    if (installedPluginsData) {
      await this.registerInstalledPlugins(installedPluginsData);
    }

    // Load registered plugins
    this.loadRegisteredPlugins(installedPluginsData);

    // Provision loaded plugins
    this.provisionPlugins();

    // // Now when all the plugin has been mapped, we can call the provision method on it
    // console.log("INIT MANAGER Plugins", this._plugins);
    this._initialized = true;
    this._loading = false;

    this.dispatchEvent(new Event("initialized"));

    console.info("ClientPluginManager is ready");
  }

  // TODO: Mark as private
  static _registeredPlugins = {};
  /**
   * Use this method to register client plugins, call it before initializing the plugin manager
   * @param {} pluginInstance
   */
  static registerPlugin(pluginName, pluginClass) {
    ClientPluginManager._registeredPlugins[pluginName] = pluginClass;
    console.log(`Registered ${pluginName}`);
  }

  /** Private */

  /**
   * Register plugins installed based on list of fetched from host
   */
  async registerInstalledPlugins(pluginsData) {
    await Promise.all(
      Object.values(pluginsData)
        ?.filter((data) => {
          // TODO: Change later
          // Skipping system for now
          if (data._system) {
            // TODO: Check if already registered before initialization?
            console.log(
              `Prevent registration from fetched data of plugin ${data.name} marked as system.`
            );
          }
          // We hard code in app bundle the plugin registration
          return !data._system;
        })
        .map(async (data) => {
          console.log("Plugin data", data);

          try {
            // TODO: Replace base url with global constants or something similar
            const base = "http://localhost:3000/system";
            // Extract plugin directory from path
            const pluginDir = data._path.split("/").pop();
            // TODO: Read package.json and import path accordingly? 'main' field should match
            // Build dynamic import path, served from host custom server
            const importPath = `${base}/${pluginDir}/dist-client/main.js`;
            console.log(
              `Registering plugin '${data.name}' from '${importPath}'...`
            );

            // IMPORTANT: The magic is to skip webpack bundling for await import! (with the webpackIgnore rule)
            const pluginImported = await import(
              /* webpackIgnore: true */ `${importPath}`
            )
              .then((res) => {
                console.log(`Imported ${data.name} as ${data._libraryName}`);
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
              return true;
            } else {
              console.error(`Error importing ${data.name} from ${importPath}`);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }
        })
    );
  }

  /**
   * This methods register system plugins. These are hard coded and bundled on build, these are not dynamically imported.
   */
  /*registerSystemPlugins() {
    // ClientPluginManager.registerPlugin('@fuse-labs/terminal', TerminalClientPlugin)
    // ClientPluginManager.registerPlugin(
    //   "@fuse-labs/terminal-client",
    //   TerminalClientPlugin
    // );
  }*/

  /**
   * Load and intialize registered plugins
   */
  loadRegisteredPlugins(installedPluginsData) {
    console.log("Start loading registered plugins...");
    this._plugins = Object.keys(ClientPluginManager._registeredPlugins).map(
      (name) => {
        let PluginClass = ClientPluginManager._registeredPlugins[name];
        if (!PluginClass) {
          throw new Error(`Missing constructor for register plugin '${name}'`);
        }

        console.log(`Loading '${name}'...`);
        console.log(installedPluginsData);
        let pluginData = installedPluginsData[name];

        return new PluginClass(pluginData);
      }
    );
    console.log("Loaded plugins", this._plugins);
  }

  /**
   * These method call the provision() method on all the installed and active plugins.
   * Plugin are already provisioned after first initialization of ClientPluginManager
   */
  provisionPlugins() {
    console.log("Provisioning active plugins...");
    console.log(this.activePlugins);
    this.activePlugins.forEach((plugin) => plugin.provision());
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
