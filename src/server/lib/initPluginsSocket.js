import signale from 'signale'
import chalk from 'chalk'
import { PluginManager, getDeviceIdFromSocket } from '@fuse-labs/core/server'
import useDeviceMiddleware from './socketDeviceMiddleware.js'

export default async function initPluginsSocket(io) {

  // Get list of plugins
  const activePlugins = PluginManager.shared.activePlugins

  // Get plugins with socket register methods
  for (const plugin of activePlugins) {

    // Define plugin namespace
    let nsPluginName = plugin.name.replace('@', 'scope:')

    // Register non-scoped plugin socket eg: localhost/@fuse-labs/terminal
    if (plugin.hasSocket) {
      let path = `/${nsPluginName}`
      // Create server namespace
      io.of(path).on("connection", socket => {
        signale.start('Connected to plugin namespace:', chalk.bold(socket.nsp.name))

        // Actually register socket listeners for plugin
        plugin.initSocket(socket)
        signale.note('Registered listeners for plugin socket for plugin', chalk.bold(plugin.name))
        
        // Add debug disconnect listener
        socket.on('disconnect', _ => {
          signale.complete('Disconnected from plugin socket:', chalk.bold(socket.nsp.name))
        })
      })
      console.success('Prepared registration for plugin socket', chalk.green(plugin.name))
    } else {
      signale.info(`Skip initSocket for plugin ${chalk.bold(plugin.name)}`)
    }

    // Register device scoped plugin socket if supports device types eg: localhost/device:DEVICE_ID/@fuse-labs/terminal
    if (plugin.hasDeviceSocket) {
      let path = new RegExp(`/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/${nsPluginName}`, 'i')
      // Create server namespace
      io.of(path)
        .use(useDeviceMiddleware)
        .on("connection", socket => {

        // TODO - Move into device middleare to attach also to socket data already the info
        // let deviceId = getDeviceIdFromSocket(socket)
        // if (!deviceId) {
        //   return signale.error('No device ID found on socket initialization:', socket.nsp.name)
        // }

        signale.start('Connected to device plugin namespace:', chalk.bold(socket.nsp.name))

        // Actually register socket listeners for plugin
        plugin.initDeviceSocket(socket)
        signale.note('Registered listeners for device plugin socket for plugin', chalk.bold(plugin.name))
        
        // Add debug disconnect listener
        socket.on('disconnect', _ => {
          signale.complete('Disconnected from device plugin socket:', chalk.bold(socket.nsp.name))
        })
      })
      console.success('Prepared registration for device plugin socket', chalk.green(plugin.name))
    } else {
      signale.info(`Skip initDeviceSocket for plugin ${chalk.bold(plugin.name)}`)
    }

    // if (plugin.hasSocket) {
    //   // Get register function from socket.js
    //   const socketRegisterPath = path.join(process.cwd(), PLUGINS_BASE_PATH, plugin.name, 'server', 'socket.js')

    //   // Try registering
    //   try {

    //     // Check register function is correctly exported from socket.js
    //     const { default: registerSocketListeners } = await import(socketRegisterPath)

    //     if (!registerSocketListeners) {
    //       signale.warn(`Found ${chalk.bold('socket.js')} file for plugin ${chalk.yellowBright(plugin.name)} but no default export to register has been found. Plugin socket will not be registered.`)
    //     } else {
    //       // If plugin support devices (has devices key in package.json), the socket will be namespaced under the device
    //       // otherwise it will be only namespace with its name

    //       // Removed @ scope character because doesn't seem to work on client socket namespace creation
    //       let nsPluginName = plugin.name.replace('@', 'scope:')
    //       let namespace = `/${nsPluginName}`
    //       if (plugin.deviceTypes?.length) {
    //         namespace = new RegExp(`/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/${nsPluginName}`, 'i')
    //       }

    //       // Create plugin socket
    //       io.of(namespace)
    //         .on('connection', pluginSocket => {
    //           signale.start('Connected to plugin namespace:', chalk.bold(pluginSocket.nsp.name))
    //           // Actually register socket listeners for plugin
    //           registerSocketListeners(pluginSocket)
    //           signale.note('Registered socket listeners for plugin', chalk.bold(plugin.name))
    //           // Add debug disconnect listener
    //           pluginSocket.on('disconnect', _ => {
    //             signale.complete('Disconnected from plugin socket:', chalk.bold(pluginSocket.nsp.name))
    //           })
    //         })

    //       signale.note('Registered connection socket listeners for plugin', chalk.bold(plugin.name), ' in namespace', chalk.green(namespace))
    //     }

    //   } catch (e) {
    //     signale.error(`Error import socket register for plugin ${chalk.bold(plugin.name)}`)
    //     signale.error(e)
    //   }
      
    // } else {
    //   signale.info(`No socket listener to register for plugin ${chalk.bold(plugin.name)}`)
    // }
  }
}