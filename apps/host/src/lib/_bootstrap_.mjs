import { logger, PluginManager, ConfigManager } from '@fuse-labs/core'

// Override default console to use Fuse logger
console = logger

// Error logger
process.on('uncaughtException', error => console.error(error.stack))
process.on('unhandledRejection', error => console.error(error.stack))

// Initialize ConfigManager
ConfigManager.shared

// Initialize PluginManagers
await PluginManager.shared.init()