import { PluginManager } from '@fuse-labs/core'
import signale from 'signale'

// Error logger
process.on('uncaughtException', error => signale.error(error.stack))
process.on('unhandledRejection', error => signale.error(error.stack))

// Initialize PluginManagers
await PluginManager.shared.init()