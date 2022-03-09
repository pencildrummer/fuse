import { logger, PluginManager } from '@fuse-labs/core/server'

// Override default console to use Fuse logger
console = logger

// Error logger
process.on('uncaughtException', error => console.error(error.stack))
process.on('unhandledRejection', error => console.error(error.stack))

// Initialize PluginManagers
await PluginManager.shared.init()