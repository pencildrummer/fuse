import path from 'path'
import fsExtra from 'fs-extra'
import { getActivePlugins } from '../core/plugins.js'
import signale from 'signale'
import chalk from 'chalk'

export default async (deviceSocket) => {

  // Get list of plugins
  const activePlugins = getActivePlugins()

  // Get plugins with socket register methods
  for (const plugin of activePlugins) {

    // Check exists socket.js file in server dir in plugin
    let socketRegisterPath = path.resolve(path.join('.', 'plugins', plugin.name, 'server', 'socket.js'))

    if (fsExtra.pathExistsSync(socketRegisterPath)) {

      // Try registering
      try {

        // Check register function is correctly exported from socket.js
        const { default: registerSocketListeners } = await import(socketRegisterPath)

        if (!registerSocketListeners) {
          signale.warn(`Found ${chalk.bold('socket.js')} file for plugin ${chalk.yellowBright(plugin.name)} but no default export to register has been found. Plugin socket will not be registered.`)
        } else {

          // Create plugin device socket
          let regex = new RegExp(`/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/${plugin.name}`, 'i')
          deviceSocket.io.of(regex)
            .on('connection', pluginSocket => {
              signale.success('Connected to device plugin namespace', pluginSocket.nsp.name)
              // Actually register socket listeners for plugin
              let disconnectHandler = registerSocketListeners(pluginSocket)
              // Register listener removal on disconnect
              if (disconnectHandler) {
                pluginSocket.on('disconnect', disconnectHandler)
              }
              signale.success('Registered socket listeners for plugin', plugin.name)
            })

          signale.success('Registered connection socket listeners for plugin', chalk.bold(plugin.name))
        }
      } catch (e) {
        signale.error(`Error import socket register for plugin ${chalk.bold(plugin.name)}`)
        signale.error(e)
      }
    } else {
      signale.info(`No socket listener to register for plugin ${chalk.bold(plugin.name)}`)
    }
  }
}