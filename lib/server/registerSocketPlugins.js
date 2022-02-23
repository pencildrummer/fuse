import path from 'path'
import fsExtra from 'fs-extra'
import { getActivePlugins } from '../core/plugins.js'
import signale from 'signale'
import chalk from 'chalk'

export default async (socket) => {
  // Get list of plugins
  const activePlugins = getActivePlugins()
  // Get plugins with socket register methods
  for (const plugin of activePlugins) {
    // Check exists socket.js file in server dir in plugin
    let socketRegisterPath = path.resolve(path.join('.', 'plugins', plugin.name, 'server', 'socket.js'))
    if (fsExtra.pathExistsSync(socketRegisterPath)) {
      signale.pending('Loading bind:', socketRegisterPath)
      try {
        // Register imported listeners
        const { default: registerSocketListeners } = await import(socketRegisterPath)
        if (!registerSocketListeners) {
          signale.warn(`Found ${chalk.bold('socket.js')} file for plugin ${chalk.yellowBright(plugin.name)} but no default export to register has been found. Plugin socket will not be registered.`)
        } else {
          let disconnectHandler = registerSocketListeners(socket)
          if (disconnectHandler) {
            socket.on('disconnect', disconnectHandler)
          }

          signale.info('Registered socket listeners for plugin', plugin.name)
        }
      } catch (e) {
        signale.error('Error requiring registerFn for plugin', plugin.name)
        signale.error(e)
      }
    }
  }
}