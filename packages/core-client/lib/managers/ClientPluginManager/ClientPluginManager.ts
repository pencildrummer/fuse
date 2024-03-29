import { PluginDataType } from "@fuse-labs/types";
import AppError from "../../errors/AppError";
import { ClientPlugin } from "../../models";
import { coreSocket } from "../../socket";
import ClientBaseManager from "../ClientBaseManager";
import ClientDeviceManager from "../ClientDeviceManager/ClientDeviceManager";
import getProxiedManager from "../getProxiedManager";

type ClientPluginInternalState = "active" | "inactive" | "unknown";

const _registeredPlugins: { [key: string]: typeof ClientPlugin } = {};

/**
 * Use this method to register client plugins, call it before initializing the plugin manager
 * @param {} pluginInstance
 */
function registerPlugin(pluginName: string, pluginClass: typeof ClientPlugin) {
  if (!pluginClass)
    throw new Error(
      `Undefined pluginClass provided to register plugin "${pluginName}"`
    );
  _registeredPlugins[pluginName] = pluginClass;
  console.log(`Registered ${pluginName}`);
}

class ClientPluginManager extends ClientBaseManager {
  protected _plugins: ClientPlugin[] = undefined;
  get plugins() {
    return this._plugins;
  }

  private _pluginsStates: {
    [key: ClientPlugin["name"]]: ClientPluginInternalState;
  } = {};

  get activePlugins() {
    return this.plugins?.filter((plugin) => plugin.active);
  }

  getPlugin(name: string) {
    return this.plugins?.find((plugin) => plugin.name == name);
  }

  async init() {
    // Add listener to provision plugins on each ClientDeviceManager updateDevices event
    const handler = () => {
      console.log("Handling updatedDevices");
      this.provisionPlugins();
    };
    ClientDeviceManager.addEventListener("updatedDevices", handler);

    coreSocket.on("plugins:activated", (pluginName) => {
      this.setPluginActive(pluginName, true);
    });
    coreSocket.on("plugins:deactivated", (pluginName) => {
      this.setPluginActive(pluginName, false);
    });
  }

  async configurePluginsFromData(installedPluginsData: {
    [key: string]: PluginDataType;
  }) {
    console.log("Plugins data:", installedPluginsData);
    console.log("Already registered:", _registeredPlugins);

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
  }

  public setPluginActive(pluginName: string, targetActive: boolean) {
    // TODO
    let plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new AppError(
        `Trying changing activation status on unknown plugin "${pluginName}"`
      );
    }

    switch (this.getInternalPluginState(pluginName)) {
      case "active":
      case "inactive":
        if (targetActive) {
          this.setInternalPluginState(pluginName, "active");
          plugin.provision();
        } else {
          this.setInternalPluginState(pluginName, "inactive");
          //plugin.unprovision() // TODO: Add maybe this method to ClientPlugin class?
        }

        this.dispatchEvent(
          new CustomEvent("pluginstatechanged", {
            detail: {
              plugin: plugin,
              state: this._pluginsStates[pluginName],
            },
          })
        );

        break;
      case "unknown":
        console.warn(
          "Trying to change activation status for plugin with unknown state. This should not happen, something is wrong."
        );
        break;
    }
  }

  public isPluginActive(pluginName: string): boolean {
    return this.getInternalPluginState(pluginName) === "active";
  }

  /** Private */

  /**
   * Register plugins installed based on list of fetched from host
   */
  async registerInstalledPlugins(pluginsData: {
    [key: string]: PluginDataType;
  }) {
    await Promise.all(
      Object.values(pluginsData)
        ?.filter((data) => {
          // TODO: Change later
          // Skipping system for now
          if (data.system) {
            // TODO: Check if already registered before initialization?
            console.log(
              `Prevent registration from fetched data of plugin ${data.name} marked as system.`
            );
          }
          // We hard code in app bundle the plugin registration
          return !data.system;
        })
        .map(async (data) => {
          console.log("Plugin data", data);

          try {
            // TODO: Replace base url with global constants or something similar
            const base = "http://localhost:3000/system";
            // Extract plugin directory from path
            const pluginDir = data.path.split("/").pop();

            // Build dynamic import path, served from host custom server
            const importPath = `${base}/${pluginDir}/package.json`;
            console.log(
              `Registering plugin '${data.name}' from '${importPath}'...`
            );

            // IMPORTANT: The magic is to skip webpack bundling for await import! (with the webpackIgnore rule)
            const pluginImported = await import(
              /* webpackIgnore: true */ `${importPath}`,
              { assert: { type: "json" } }
            )
              .then((res) => {
                console.log(`Imported package.json for ${data.name}`);
                console.log("JSON", res.default);
                let packageJSON = res.default;
                let moduleImportPath;
                // Check browser, exports or main field
                if (packageJSON.browser) {
                  moduleImportPath = `${base}/${pluginDir}/${packageJSON.browser}`;
                } else if (packageJSON.exports?.["./client"]) {
                  moduleImportPath = `${base}/${pluginDir}/${packageJSON.exports?.["./client"]}`;
                } else if (packageJSON.main) {
                  moduleImportPath = `${base}/${pluginDir}/${packageJSON.main}`;
                } else {
                  moduleImportPath = `${base}/${pluginDir}/index.js`;
                }
                console.log(`Importing from ${moduleImportPath}`);
                return import(
                  /* webpackIgnore: true */ `${moduleImportPath}`
                ).then(() => {
                  console.log(`Imported ${data.name} as ${data.libraryName}`);
                  console.log(window[data.libraryName]);
                  // Access loaded plugin from window because we are loading from UMD
                  // TODO: Investigate bettere this loading process
                  return window[data.libraryName];
                });
              })
              .catch((err) => {
                console.error(err);
                return null;
              });

            if (pluginImported) {
              // Get the default implementation
              const { default: pluginClass } = pluginImported;
              // Register plugin class
              registerPlugin(data.name, pluginClass);
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
  loadRegisteredPlugins(installedPluginsData: {
    [key: string]: PluginDataType;
  }) {
    console.log("Start loading registered plugins...");
    this._plugins = Object.keys(_registeredPlugins).map((name) => {
      let PluginClass: typeof ClientPlugin = _registeredPlugins[name];
      if (!PluginClass) {
        throw new Error(`Missing constructor for register plugin '${name}'`);
      }

      console.log(`Loading '${name}'...`);
      console.log(installedPluginsData);

      // Get plugin configuration data from host
      let pluginData = installedPluginsData[name];

      // Create plugin instance
      let plugin = new PluginClass(pluginData);

      // Configure plugin state based on provided installedPluginsData
      let state: ClientPluginInternalState = "unknown";
      if (pluginData.active === true) {
        state = "active";
      } else if (pluginData.active === false) {
        state = "inactive";
      }
      this.setInternalPluginState(plugin.name, state);

      return plugin;
    });
    console.log("Loaded plugins", this._plugins);
  }

  /**
   * These method call the provision() method on all the installed and active plugins.
   * Plugin are already provisioned after first initialization of ClientPluginManager
   */
  private provisionPlugins() {
    console.log("Provisioning active plugins...");
    console.log(this.activePlugins);
    if (!this.activePlugins) {
      console.log("No plugins registered to provision");
    } else {
      this.activePlugins?.forEach((plugin) => plugin.provision());
    }
  }

  private getInternalPluginState(
    pluginName: string
  ): ClientPluginInternalState {
    return this._pluginsStates[pluginName] ?? "unknown";
  }

  private setInternalPluginState(
    pluginName: string,
    state: ClientPluginInternalState
  ) {
    this._pluginsStates[pluginName] = state;
  }
}

const clientPluginManager = getProxiedManager(new ClientPluginManager());

export default clientPluginManager;
export { registerPlugin };
