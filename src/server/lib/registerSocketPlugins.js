import path from 'path'
import signale from 'signale'
import chalk from 'chalk'
import { getActivePlugins, PLUGINS_BASE_PATH } from '@fuse-labs/core'

export default async function registerSocketPlugins(io) {

  // Get list of plugins
  const activePlugins = getActivePlugins()

  // Get plugins with socket register methods
  for (const plugin of activePlugins) {

    if (plugin.fuse.hasSocket) {
      // Get register function from socket.js
      const socketRegisterPath = path.join(process.cwd(), PLUGINS_BASE_PATH, plugin.name, 'server', 'socket.js')

      // Try registering
      try {

        // Check register function is correctly exported from socket.js
        const { default: registerSocketListeners } = await import(socketRegisterPath)

        if (!registerSocketListeners) {
          signale.warn(`Found ${chalk.bold('socket.js')} file for plugin ${chalk.yellowBright(plugin.name)} but no default export to register has been found. Plugin socket will not be registered.`)
        } else {
          // If plugin support devices (has devices key in package.json), the socket will be namespaced under the device
          // otherwise it will be only namespace with its name

          // Removed @ scope character because doesn't seem to work on client socket namespace creation
          let nsPluginName = plugin.name.replace('@', 'scope:')
          let namespace = `/${nsPluginName}`
          if (plugin.fuse.devices) {
            namespace = new RegExp(`/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/${nsPluginName}`, 'i')
          }

          // Create plugin socket
          io.of(namespace)
            .on('connection', pluginSocket => {
              signale.start('Connected to plugin namespace:', chalk.bold(pluginSocket.nsp.name))
              // Actually register socket listeners for plugin
              registerSocketListeners(pluginSocket)
              signale.note('Registered socket listeners for plugin', chalk.bold(plugin.name))
              // Add debug disconnect listener
              pluginSocket.on('disconnect', _ => {
                signale.complete('Disconnected from plugin socket:', chalk.bold(pluginSocket.nsp.name))
              })
            })

          signale.note('Registered connection socket listeners for plugin', chalk.bold(plugin.name), ' in namespace', chalk.green(namespace))
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