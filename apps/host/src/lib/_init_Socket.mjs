import signale from 'signale'
import chalk from "chalk"
import { socketServer as io, useDeviceMiddleware } from '@fuse-labs/core/server'

export default async function _init_Socket() {

  io.on('connection', async (socket) => {
    signale.success('Connected to main localhost socket')
  })
  
  signale.note('Registering device namespace on connection handler')

  // Create dynamic devices namespace (eg: /device-42424242-4242-4242-4242-424242424242)
  let devicePath = /^\/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i
  // Create namespace for device IDs
  io.of(devicePath)
    .use(useDeviceMiddleware)
    .on("connection", async (deviceSocket) => {
      signale.start('Connected device socket:', chalk.blueBright(deviceSocket.nsp.name))

      deviceSocket.on('disconnect', (reason) => {
        signale.complete('Disconnected from namespace', deviceSocket.nsp.name, 'Cause', reason)
      })
      
    })
}