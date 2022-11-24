import {
  logger,
  PluginManager,
  ConfigManager,
  ProfileManager,
  DeviceManager,
} from "@fuse-labs/core";

export default async function _bootstrap_() {
  // Error logger
  process.on("uncaughtException", (error: Error) => logger.error(error.stack));
  process.on("unhandledRejection", (error: Error) => logger.error(error.stack));

  // Initialize ConfigManager
  ConfigManager.init();
  ProfileManager.init();

  // Initialize PluginManagers
  await PluginManager.init();

  DeviceManager.init();
}
