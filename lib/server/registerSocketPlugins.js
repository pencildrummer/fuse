import path from 'path'
import fsExtra from 'fs-extra'
import * as plugins from '../core/plugins.js'
import signale from 'signale'

export default async (socket) => {
  // Get list of plugins
  const activePlugins = plugins.getActivePlugins()
  // Get plugins with socket register methods
  for (const plugin of activePlugins) {
    // Check exists socket.js file in server dir in plugin
    let socketRegisterPath = path.resolve(path.join('.', 'plugins', plugin, 'server', 'socket.js'))
    if (fsExtra.pathExistsSync(socketRegisterPath)) {
      signale.pending('Loading bind:', socketRegisterPath)
      try {
        // Register imported listeners
        const { default: registerSocketListeners } = await import(socketRegisterPath)
        registerSocketListeners(socket)

        signale.info('Registered socket listeners for plugin', plugin)
      } catch (e) {
        signale.error('Error requiring registerFn for plugin', plugin)
        signale.error(e)
      }
    }
  }
}