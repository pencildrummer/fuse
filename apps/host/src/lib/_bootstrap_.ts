import {
  logger,
  PluginManager,
  ConfigManager,
  ProfileManager,
  DeviceManager,
  AppManager,
} from "@fuse-labs/core";

export default async function _bootstrap_() {
  // Error logger
  process.on("uncaughtException", (error: Error) => logger.error(error.stack));
  process.on("unhandledRejection", (error: Error) => logger.error(error.stack));

  // Initialize managers
  ConfigManager.init();
  ProfileManager.init();
  DeviceManager.init();

  // Initialize PluginManagers
  await PluginManager.init();

  AppManager.init();
}
