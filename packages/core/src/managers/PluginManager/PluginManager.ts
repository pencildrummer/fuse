import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { pathToFileURL } from "url";
import { SYSTEM_BASE_PATH } from "../../constants.js";
import Plugin from "../../models/plugins/Plugin/Plugin.js";
import { logger } from "../../logger.js";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";
import __SYSTEM_PLUGINS__ from "../../defaults/plugins.json" assert { type: "json" };

export type FuseJSONSchema = {
  host?: string;
  /**
   * @deprecated Should not be used. Use 'host' instead
   */
  server?: string;
  client?: string;
};

type PluginInfo = {
  name: string;
  path: string;
  active?: Plugin["active"];
};

const PLUGINS_LIST_FILE_PATH = path.resolve(
  path.join(SYSTEM_BASE_PATH, "plugins.json")
);

let instance: PluginManager;

class PluginManager extends BaseManager {
  get SYSTEM_PLUGIN_NAMES() {
    return Object.keys(__SYSTEM_PLUGINS__);
  }

  private _plugins: { [key: string]: Plugin } = {};
  get plugins() {
    return this._plugins;
  }

  private _activePluginsNames: string[] = [];
  get activePluginsNames() {
    return this._activePluginsNames;
  }

  get activePlugins() {
    return Object.values(this._plugins).filter((plugin) => plugin.active);
  }

  getPlugin(name: Plugin["name"]) {
    return this._plugins[name];
  }

  constructor() {
    super();

    if (instance)
      throw new Error("Created new shared ConfigManager is not permitted");
    instance = this;
  }

  async init() {
    // Set system plugins as always active
    this._activePluginsNames = [...Object.keys(__SYSTEM_PLUGINS__)];

    // Load installed plugins based on stored plugins.json config file
    let pluginsList = this.pluginsListInfo;

    // Init Plugin(s) based on names and add it to the plugin manager store
    for (const index in Object.keys(pluginsList)) {
      let pluginName = Object.keys(pluginsList)[index];
      const pluginInfo = pluginsList[pluginName];

      let plugin = await this.loadPluginWithInfo(pluginInfo);
      // // Check if system plugin
      // if (this.SYSTEM_PLUGIN_NAMES.includes(pluginName)) {
      //   plugin = await this.loadSystemPlugin(pluginInfo);
      // } else {
      //   plugin = await this.loadInstalledPlugin(pluginInfo);
      // }

      if (plugin) {
        // Add plugin
        this._plugins[pluginName] = plugin;
        //plugins.push(plugin);
        logger.success(`Loaded plugin ${chalk.bold.green(pluginName)}`);
      }
    }
  }

  async loadPluginWithInfo(pluginInfo: PluginInfo) {
    let pluginName = pluginInfo.name;
    logger.info(`Loading ${pluginName}`);

    // Prepare import path
    let pluginBasePath;
    let packageBasePath;

    // Check if system plugin
    const isSystem = this.SYSTEM_PLUGIN_NAMES.includes(pluginName);

    // Prepare base path based on the fact that is system or not
    if (isSystem) {
      pluginBasePath = path.resolve(
        path.join(process.cwd(), "../../", pluginInfo.path)
      );
    } else {
      pluginBasePath = path.resolve(path.join(process.cwd(), pluginInfo.path));
    }

    // Search for fuse.json
    let fuseJsonPath = path.join(pluginBasePath, "fuse.json");
    if (fs.existsSync(fuseJsonPath)) {
      // Read fuse.json
      const fuseJson: FuseJSONSchema = fs.readJsonSync(fuseJsonPath);

      // Check for server directory, otherwise assume the code to be imported in the root

      if (fuseJson.host) {
        packageBasePath = path.join(pluginBasePath, fuseJson.host);
      } else if (fuseJson.server) {
        // Support for server will be removed
        logger.warn(
          `Reading import path for ${pluginName} from 'server' config. Use 'host' instead.`
        );
        packageBasePath = path.join(pluginBasePath, fuseJson.server);
      } else {
        throw Error(
          `Trying to load system plugin from fuse.json at path ${chalk.bold(
            path.join(pluginBasePath, "fuse.json")
          )}. No host or server fields found.`
        );
      }
    } else {
      // Check if old server directory exists, notify to changed it but use it to load module anyway
      if (fs.pathExistsSync(path.join(pluginBasePath, "server"))) {
        logger.warn(`Using depreacted server dir to load ${pluginName}`);
        packageBasePath = path.join(pluginBasePath, "server");
      } else {
        // If root fuse.json does not exists, assume to be imported from /host subdir
        packageBasePath = path.join(pluginBasePath, "host");
      }
    }

    // Append package.json to importPath
    const importPath = this.getImportPathFromPackage(
      path.join(packageBasePath, "package.json")
    );

    if (!fs.existsSync(importPath)) {
      throw new Error(
        `Trying to load system plugin from path ${importPath}. Path does not exists.`
      );
    }

    //
    // Start importing plugin module
    //
    const pluginModule = await import(pathToFileURL(importPath).toString())
      .then((res) => {
        if (!res.default) {
          throw new Error(
            "Found module but no default export is found. Should export the plugin class."
          );
        }
        if (typeof res.default !== "function") {
          throw new Error(
            `Default export of ${pluginName}/host is not a class`
          );
        }
        if (!(res.default.prototype instanceof Plugin)) {
          throw new Error(
            `Plugin class "${chalk.red(
              res.default.name
            )}" must extend "${chalk.bold(Plugin.name)}" from ${chalk.underline(
              "@fuse-labs/core"
            )}`
          );
        }

        logger.success(
          `${chalk.green(pluginName)}: module found, using "${chalk.green.bold(
            res.default.name
          )}" to initialize plugin`
        );

        return res;
      })
      .catch((err) => {
        switch (err.code) {
          case "ERR_PACKAGE_PATH_NOT_EXPORTED":
            logger.warn(
              `${chalk.yellow(pluginName)}: not loaded, "${chalk.bold.yellow(
                pluginName
              )}" do not support host side. If unexpected check "${pluginName}" exports ./host`
            );
            break;
          case "ERR_MODULE_NOT_FOUND":
          // Check code, because if simply the module does not export ./server subpath, is not an error, the plugin does not support server plugin
          default:
            logger.error(err);
            logger.warn(
              `${chalk.yellow(
                pluginName + "/host"
              )}: module not found, using generic ${chalk.yellow(
                Plugin.name
              )} class to initialize "${chalk.bold(pluginName)}"`
            );
        }
        return null;
      });

    // Getting default export, is the Plugin subclass class
    let PluginClass: new (name: string, installPath: string) => Plugin =
      pluginModule.default;

    // Create Plugin instance for required pluginName
    let plugin = new PluginClass(pluginName, pluginBasePath);
    if (plugin) {
      // Configure plugin activation status (system plugins are always active)
      if (pluginInfo.active === true || isSystem) {
        this._activePluginsNames = [...this._activePluginsNames, pluginName];
      }
      return plugin;
    } else {
      logger.error(`Error initializing plugin instance for ${pluginName}`);
      return null;
    }
  }

  private getImportPathFromPackage(packagePath: string) {
    // Read package.json
    const pkg = fs.readJsonSync(packagePath);

    // TODO: Validate fields in pkg JSON

    // Check for server directory, otherwise assume the code to be imported in the root
    let packageBasePath = path.dirname(packagePath);
    let importPath;
    // TODO: Decide if /host or /server
    if (pkg.exports?.["./host"]) {
      importPath = path.join(packageBasePath, pkg.exports?.["./host"]);
    } else if (pkg.exports?.["./server"]) {
      importPath = path.join(packageBasePath, pkg.exports?.["./server"]);
    } else if (typeof pkg.exports === "string") {
      importPath = path.join(packageBasePath, pkg.exports);
    } else {
      throw Error(
        `Trying to load system plugin from package.json at path ${chalk.bold(
          packagePath
        )}. No import fields found. Allowed fields for host plugins are "exports", "exports.host", "exports.server" (discouraged). "main" field is not supported because can conflict with host and client plugins in same directory.`
      );
    }
    return importPath;
  }

  // async loadSystemPlugin(systemPluginInfo: PluginInfo) {
  //   // TODO: Merge client and server in one pacakge with internal workspaces and allow package json to export correct ones?

  //   let systemPluginPath = path.resolve(
  //     path.join(process.cwd(), "../../", systemPluginInfo.path)
  //   );

  //   // TODO: We can create a different file in source plugin like "plugin.json" instead of package.sjon that may conflict
  //   // Check pakcage.json exists
  //   let pkgPath = path.join(systemPluginPath, "package.json");
  //   if (!fs.existsSync(pkgPath)) {
  //     // If root package.json does not exists, check for /server subdir package.json
  //     // TODO: Decide if merge everything into one main package.json, that sounds better
  //     if (
  //       fs.existsSync(path.join(systemPluginPath, "server", "package.json"))
  //     ) {
  //       systemPluginPath = path.join(systemPluginPath, "server");
  //       pkgPath = path.join(systemPluginPath, "package.json");
  //       // TODO: Allow "main" field if in subdir?
  //       logger.warn(
  //         `Loading plugin ${chalk.bold.yellow(
  //           systemPluginInfo.name
  //         )} from "/server" subdir in main package due to missing root package.json. This is discouraged and will be removed. Fix it.`
  //       );
  //     } else {
  //       throw new Error(
  //         `Missing package.json for plugin ${systemPluginInfo.name} at path "${systemPluginInfo.path}"`
  //       );
  //     }
  //   }

  //   // Read package.json
  //   const pkg = fs.readJsonSync(pkgPath);

  //   // TODO: Validate fields in pkg JSON

  //   // Check for server directory, otherwise assume the code to be imported in the root
  //   let importPath;
  //   // TODO: Decide if /host or /server
  //   if (pkg.exports?.["./host"]) {
  //     importPath = path.join(systemPluginPath, pkg.exports?.["./host"]);
  //   } else if (pkg.exports?.["./server"]) {
  //     importPath = path.join(systemPluginPath, pkg.exports?.["./server"]);
  //   } else if (typeof pkg.exports === "string") {
  //     importPath = path.join(systemPluginPath, pkg.exports);
  //   } else {
  //     throw Error(
  //       `Trying to load system plugin from package.json at path ${chalk.bold(
  //         pkgPath
  //       )}. No import fields found. Allowed fields for host plugins are "exports", "exports.host", "exports.server" (discouraged). "main" field is not supported because can conflict with host and client plugins in same directory.`
  //     );
  //   }

  //   if (!fs.existsSync(importPath)) {
  //     throw new Error(
  //       `Trying to load system plugin from path ${importPath}. Path does not exists.`
  //     );
  //   }

  //   // TODO: Check import path has index or not or let node do its thing?
  //   //const pluginModule = await import(`${path.join(importPath, "index.js")}`);
  //   const pluginModule = await (async () => {
  //     let module = await import(`${importPath}`).then((module) => {
  //       console.log("Imported module");
  //       return module;
  //     });
  //     console.log("Loaded after await import");
  //     return module;
  //   })();

  //   let PluginClass = pluginModule.default;

  //   // Check import default is a class

  //   let systemPlugin;
  //   try {
  //     systemPlugin = new PluginClass(systemPluginInfo.name, systemPluginPath);
  //   } catch (e) {
  //     console.error(
  //       `${chalk.bold.red(
  //         systemPluginInfo.name
  //       )} default export is not a class. Imported from ${importPath}`
  //     );
  //     return null;
  //   }

  //   // System plugins are always active
  //   this._activePluginsNames = [
  //     ...this._activePluginsNames,
  //     systemPluginInfo.name,
  //   ];
  //   return systemPlugin;
  // }

  // async loadInstalledPlugin(pluginInfo: PluginInfo) {
  //   const pluginName = pluginInfo.name;
  //   const pluginPath = path.resolve(pluginInfo.path);
  //   const pluginPkgPath = path.resolve(pluginPath, "package.json");

  //   // Find package.json
  //   if (!fs.existsSync(pluginPkgPath)) {
  //     return logger.error(
  //       `Unable to find package.json for plugin ${chalk.bold(
  //         pluginName
  //       )} at path ${pluginPkgPath}`
  //     );
  //   }

  //   // Read package.json
  //   let pluginPkg;
  //   try {
  //     pluginPkg = fs.readJsonSync(pluginPkgPath);
  //   } catch (err) {
  //     return logger.error(
  //       `Error reading package.json from plugin ${pluginName}`
  //     );
  //   }

  //   // Check if supports server side (should export server)
  //   if (pluginPkg.exports?.["./server"] == undefined) {
  //     return logger.warn(
  //       `${chalk.yellow(pluginName)}: does not export a host plugin, skipping.`
  //     );
  //   }

  //   // Build final import path
  //   const importPath = path.join(pluginPath, pluginPkg.exports["./server"]);
  //   logger.debug(importPath);
  //   const pluginModule = await import(pathToFileURL(importPath).toString())
  //     .then((res) => {
  //       if (!res.default) {
  //         throw new Error(
  //           "Found module but no default export is found. Should export the plugin class."
  //         );
  //       }
  //       if (typeof res.default !== "function") {
  //         throw new Error(
  //           `Default export of ${pluginName}/server is not a class`
  //         );
  //       }
  //       if (!(res.default.prototype instanceof Plugin)) {
  //         throw new Error(
  //           `Plugin class "${chalk.red(
  //             res.default.name
  //           )}" must extend "${chalk.bold(Plugin.name)}" from ${chalk.underline(
  //             "@fuse-labs/core"
  //           )}`
  //         );
  //       }
  //       logger.success(
  //         `${chalk.green(
  //           pluginName + "/server"
  //         )}: module found, using "${chalk.green.bold(
  //           res.default.name
  //         )}" to initialize plugin`
  //       );
  //       return res;
  //     })
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "ERR_PACKAGE_PATH_NOT_EXPORTED":
  //           logger.warn(
  //             `${chalk.yellow(
  //               pluginName + "/server"
  //             )}: not loaded, "${chalk.bold.yellow(
  //               pluginName
  //             )}" do not support server side. If unexpected check "${pluginName}" exports ./server`
  //           );
  //           break;
  //         case "ERR_MODULE_NOT_FOUND":
  //         // Check code, because if simply the module does not export ./server subpath, is not an error, the plugin does not support server plugin
  //         default:
  //           logger.error(err);
  //           logger.warn(
  //             `${chalk.yellow(
  //               pluginName + "/server"
  //             )}: module not found, using generic ${chalk.yellow(
  //               Plugin.name
  //             )} class to initialize "${chalk.bold(pluginName)}"`
  //           );
  //       }
  //       return null;
  //     });

  //   let PluginClass = Plugin;
  //   if (pluginModule?.default) PluginClass = pluginModule.default;

  //   // Create Plugin instance for required pluginName
  //   let plugin = new PluginClass(pluginName, pluginPath);
  //   if (plugin) {
  //     // Configure plugin activation status
  //     if (pluginInfo.active === true) {
  //       this._activePluginsNames = [...this._activePluginsNames, pluginName];
  //     }
  //     return plugin;
  //   } else {
  //     console.error(`Error initializing plugin instance for ${pluginName}`);
  //     return null;
  //   }
  // }

  /** Get all plugins info, including system plugins */
  private get pluginsListInfo(): { [key: string]: PluginInfo } {
    return {
      ...__SYSTEM_PLUGINS__,
      ...this.installedPluginsListInfo,
    };
  }

  /** Get installed plugin info, without system plugins */
  private get installedPluginsListInfo(): { [key: string]: PluginInfo } {
    if (!fs.existsSync(PLUGINS_LIST_FILE_PATH)) {
      logger.warn(
        "No plugins list path to load from. This should be an error, at least an empty configuration plugins.json file should exists."
      );
      return {};
    }

    return fs.readJsonSync(PLUGINS_LIST_FILE_PATH);
  }

  activate(pluginName: Plugin["name"]) {
    this.setPluginActive(pluginName, true);
  }

  deactivate(pluginName: Plugin["name"]) {
    this.setPluginActive(pluginName, false);
  }

  /**
   * Private
   */

  setPluginActive(name: Plugin["name"], active: Plugin["active"]) {
    // Check plugin is in installed plugins
    let plugin = this.getPlugin(name);
    if (!plugin) {
      throw new Error(
        "Trying to change active state for a plugin not installed: " + name
      );
    }

    // Check plugin is not a system one
    if (plugin.system) {
      throw new Error("Trying to deactivate system plugin: " + plugin.name);
    }

    // Update system active list file, later will be moved onto Plugin class

    if (active) {
      this._activePluginsNames.push(name);
    } else {
      this._activePluginsNames = this._activePluginsNames.filter(
        (activePluginName) => activePluginName != name
      );
    }

    // Updated installed plugin database

    let pluginsListInfo = this.installedPluginsListInfo;

    if (!pluginsListInfo[name]) {
      throw new Error(
        "Trying to change active state for a plugin that is not installed. Plugins database is corrupted."
      );
    }

    // Set plugin as specified active state
    pluginsListInfo[name].active = active;

    // Updated plugins database
    fs.writeFileSync(
      PLUGINS_LIST_FILE_PATH,
      JSON.stringify(pluginsListInfo, null, 2)
    );

    logger.success(
      `Changed plugin ${chalk.magenta(plugin.name)} active state to ${
        active ? chalk.greenBright("active") : chalk.redBright("not active")
      }`
    );
  }
}

const pluginManager = getProxiedManager(new PluginManager());
export default pluginManager;
