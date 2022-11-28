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
  await ConfigManager.init();
  await ProfileManager.init();
  await DeviceManager.init();
  await PluginManager.init();

  await AppManager.init();
}
