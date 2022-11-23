import { logger, PluginManager, ConfigManager } from "@fuse-labs/core";

export default async function _bootstrap_() {
  // Override default console to use Fuse logger
  console = logger as unknown as Console;

  // Error logger
  process.on("uncaughtException", (error: Error) => logger.error(error.stack));
  process.on("unhandledRejection", (error: Error) => logger.error(error.stack));

  // Initialize ConfigManager
  ConfigManager.shared;

  // Initialize PluginManagers
  await PluginManager.shared.init();
}
