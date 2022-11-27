import { ConfigDataType } from "@fuse-labs/types";
import fs from "fs-extra";
import path from "path";
import * as url from "url";
import { SYSTEM_BASE_PATH } from "../../constants.js";
import { logger } from "../../logger.js";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";

let instance: ConfigManager;

class ConfigManager extends BaseManager {
  private _config: ConfigDataType = {};
  get config() {
    return this._config;
  }

  constructor() {
    super();

    if (instance)
      throw new Error("Created new shared ConfigManager is not permitted");
    instance = this;
  }

  init() {
    logger.pending("ConfigManager is initializing...");

    // Retrieve default config to merge even if there is an existing config file in the app
    const __dirname = url.fileURLToPath(new URL("..", import.meta.url));
    this._config = fs.readJsonSync(
      path.join(__dirname, "..", "defaults", "config.json")
    );

    // Retrieve config from stored json and merge with defaults if presend
    const configPath = path.join(SYSTEM_BASE_PATH, "config.json");
    if (fs.existsSync(configPath)) {
      // Read from existing app system config file
      const existingConfig = fs.readJsonSync(configPath);
      this._config = {
        ...this._config,
        ...existingConfig,
      };
    }
    // And store it in app system path
    this.save();

    logger.ready("ConfigManager is now ready!");
  }

  save() {
    fs.writeFileSync(
      path.join(SYSTEM_BASE_PATH, "config.json"),
      JSON.stringify(this._config, null, 2)
    );
  }
}

const configManager = getProxiedManager(new ConfigManager());
export default configManager;
