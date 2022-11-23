import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { pathToFileURL } from "url";
import { SYSTEM_BASE_PATH } from "../../constants.js";
import Plugin from "../../models/plugins/Plugin/Plugin.js";

type PluginInfo = {
  name: string;
  path: string;
  active?: Plugin["active"];
};

const PLUGINS_LIST_FILE_PATH = path.resolve(
  path.join(SYSTEM_BASE_PATH, "plugins.json")
);

import __SYSTEM_PLUGINS__ from "../../defaults/plugins.json" assert { type: "json" };

import { logger } from "../../logger.js";

class PluginManager {
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
    //return this._plugins.find((plugin) => plugin.name == name);
  }

  private _initialized = false;

  constructor() {
    //
  }

  async init() {
    if (this._initialized)
      throw new Error("Trying to re-initialize PluginManager");

    logger.pending("Initializing PluginManager");

    // Set system plugins as always active
    this._activePluginsNames = [...Object.keys(__SYSTEM_PLUGINS__)];

    // Load installed plugins based on stored plugins.json config file
    let pluginsList = this.getPluginsListInfo();

    // Init Plugin(s) based on names and add it to the plugin manager store
    this._plugins = await Object.keys(pluginsList).reduce(
      async (prev, pluginName) => {
        // Wait for previous plugin load process
        const plugins = await prev;

        const pluginInfo = pluginsList[pluginName];

        let plugin;
        // Check if system plugin
        if (this.SYSTEM_PLUGIN_NAMES.includes(pluginName)) {
          plugin = await this.loadSystemPlugin(pluginInfo);
        } else {
          plugin = await this.loadInstalledPlugin(pluginInfo);
        }

        if (plugin) {
          // Add plugin
          plugins[pluginName] = plugin;
          //plugins.push(plugin);
          logger.success(`Loaded plugin ${chalk.bold.green(pluginName)}`);
        }
        return plugins;
      },
      Promise.resolve(this._plugins)
    );

    this._initialized = true;

    signale.success("PluginManager is now ready");
  }

  async loadSystemPlugin(systemPluginInfo: PluginInfo) {
    // TODO: Merge client and server in one pacakge with internal workspaces and allow package json to export correct ones?

    let systemPluginPath = path.resolve(
      path.join(process.cwd(), "../../", systemPluginInfo.path)
    );

    // Check pakcage.json exists
    let pkgPath = path.join(systemPluginPath, "package.json");
    if (!fs.existsSync(pkgPath)) {
      // If root package.json does not exists, check for /server subdir package.json
      // TODO: Decide if merge everything into one main package.json, that sounds better
      if (
        fs.existsSync(path.join(systemPluginPath, "server", "package.json"))
      ) {
        systemPluginPath = path.join(systemPluginPath, "server");
        pkgPath = path.join(systemPluginPath, "package.json");
        // TODO: Allow "main" field if in subdir?
        logger.warn(
          `Loading plugin ${chalk.bold.yellow(
            systemPluginInfo.name
          )} from "/server" subdir in main package due to missing root package.json. This is discouraged and will be removed. Fix it.`
        );
      } else {
        throw new Error(
          `Missing package.json for plugin ${systemPluginInfo.name} at path "${systemPluginInfo.path}"`
        );
      }
    }

    // Read package.json
    const pkg = fs.readJsonSync(pkgPath);

    // TODO: Validate fields in pkg JSON

    // Check for server directory, otherwise assume the code to be imported in the root
    let importPath;
    // TODO: Decide if /host or /server
    if (pkg.exports?.["./host"]) {
      importPath = path.join(systemPluginPath, pkg.exports?.["./host"]);
    } else if (pkg.exports?.["./server"]) {
      importPath = path.join(systemPluginPath, pkg.exports?.["./server"]);
    } else if (typeof pkg.exports === "string") {
      importPath = path.join(systemPluginPath, pkg.exports);
    } else {
      throw Error(
        `Trying to load system plugin from package.json at path ${chalk.bold(
          pkgPath
        )}. No import fields found. Allowed fields for host plugins are "exports", "exports.host", "exports.server" (discouraged). "main" field is not supported because can conflict with host and client plugins in same directory.`
      );
    }

    if (!fs.existsSync(importPath)) {
      throw new Error(
        `Trying to load system plugin from path ${importPath}. Path does not exists.`
      );
    }

    // TODO: Check import path has index or not or let node do its thing?
    //const pluginModule = await import(`${path.join(importPath, "index.js")}`);
    const pluginModule = await import(`${importPath}`);

    let PluginClass = pluginModule.default;

    // Check import default is a class

    let systemPlugin;
    try {
      systemPlugin = new PluginClass(systemPluginInfo.name, systemPluginPath);
    } catch (e) {
      console.error(
        `${chalk.bold.red(
          systemPluginInfo.name
        )} default export is not a class. Imported from ${importPath}`
      );
      return null;
    }

    // System plugins are always active
    this._activePluginsNames = [
      ...this._activePluginsNames,
      systemPluginInfo.name,
    ];
    return systemPlugin;
  }

  async loadInstalledPlugin(pluginInfo: PluginInfo) {
    const pluginName = pluginInfo.name;
    const pluginPath = path.resolve(pluginInfo.path);
    const pluginPkgPath = path.resolve(pluginPath, "package.json");

    // Find package.json
    if (!fs.existsSync(pluginPkgPath)) {
      return console.error(
        "Unable to find package.json for plugin",
        pluginName
      );
    }

    // Read package.json
    let pluginPkg;
    try {
      pluginPkg = fs.readJsonSync(pluginPkgPath);
    } catch (err) {
      return console.error(
        "Error reading package.json from plugin",
        pluginName
      );
    }

    // Check if supports server side (should export server)
    if (pluginPkg.exports?.["./server"] == undefined) {
      return console.warn(
        `${chalk.yellow(pluginName)}: does not export a host plugin, skipping.`
      );
    }

    // Build final import path
    const importPath = path.join(pluginPath, pluginPkg.exports["./server"]);
    console.debug(importPath);
    const pluginModule = await import(pathToFileURL(importPath).toString())
      .then((res) => {
        if (!res.default) {
          throw new Error(
            "Found module but no default export is found. Should export the plugin class."
          );
        }
        if (typeof res.default !== "function") {
          throw new Error(
            `Default export of ${pluginName}/server is not a class`
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
        signale.success(
          `${chalk.green(
            pluginName + "/server"
          )}: module found, using "${chalk.green.bold(
            res.default.name
          )}" to initialize plugin`
        );
        return res;
      })
      .catch((err) => {
        switch (err.code) {
          case "ERR_PACKAGE_PATH_NOT_EXPORTED":
            signale.warn(
              `${chalk.yellow(
                pluginName + "/server"
              )}: not loaded, "${chalk.bold.yellow(
                pluginName
              )}" do not support server side. If unexpected check "${pluginName}" exports ./server`
            );
            break;
          case "ERR_MODULE_NOT_FOUND":
          // Check code, because if simply the module does not export ./server subpath, is not an error, the plugin does not support server plugin
          default:
            signale.error(err);
            signale.warn(
              `${chalk.yellow(
                pluginName + "/server"
              )}: module not found, using generic ${chalk.yellow(
                Plugin.name
              )} class to initialize "${chalk.bold(pluginName)}"`
            );
        }
        return null;
      });

    let PluginClass = Plugin;
    if (pluginModule?.default) PluginClass = pluginModule.default;

    // Create Plugin instance for required pluginName
    let plugin = new PluginClass(pluginName, pluginPath);
    if (plugin) {
      // Configure plugin activation status
      if (pluginInfo.active === true) {
        this._activePluginsNames = [...this._activePluginsNames, pluginName];
      }
      return plugin;
    } else {
      console.error(`Error initializing plugin instance for ${pluginName}`);
      return null;
    }
  }

  /** Get all plugins info, including system plugins */
  getPluginsListInfo(): { [key: string]: PluginInfo } {
    return {
      ...__SYSTEM_PLUGINS__,
      ...this.getInstalledPluginsListInfo(),
    };
  }

  /** Get installed plugin info, without system plugins */
  getInstalledPluginsListInfo(): { [key: string]: PluginInfo } {
    if (!fs.existsSync(PLUGINS_LIST_FILE_PATH)) {
      signale.warn(
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

    let pluginsListInfo = this.getInstalledPluginsListInfo();

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

    signale.success(
      `Changed plugin ${chalk.magenta(plugin.name)} active state to ${
        active ? chalk.greenBright("active") : chalk.redBright("not active")
      }`
    );
  }
}

// Export shared manager
class Singleton {
  private static sharedInstance: PluginManager;
  constructor() {
    throw new Error("User PluginManager.shared instead");
  }

  static get shared() {
    if (!Singleton.sharedInstance) {
      signale.note("New shared instance of PluginManager");
      Singleton.sharedInstance = new PluginManager();
    }
    return Singleton.sharedInstance;
  }
}

export default Singleton;
