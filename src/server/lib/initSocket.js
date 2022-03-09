// import express from "express"
// import { createServer } from 'http'
// import { Server as SocketServer } from 'socket.io'
import signale from 'signale'
import chalk from "chalk"
import initPluginsSocket from "./initPluginsSocket.js"
import useDeviceMiddleware from "./socketDeviceMiddleware.js"
import { socketServer as io } from '@fuse-labs/core/server'

export default async function initSocket({ hostname, port }) {

  // // Socket.io server
  // const expressApp = express()
  // const socketServer = createServer(expressApp)

  // // Main socket server (/ namespace)
  // const io = new SocketServer(socketServer, {
  //   cors: {
  //     origin: [
  //       'http://localhost:3000',
  //       'https://admin.socket.io'
  //     ],
  //     credentials: true,
  //   }
  // })

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
      
      // TODO - Move this into a middleware? That can also be used in device plugin sockets
      // Check device exists
      // let deviceId = getDeviceIdFromNamespace(deviceSocket.nsp.name)
      // let device = DeviceManager.shared.getDevice(deviceId)
      // if (device) {
      //   deviceSocket.on('disconnect', (reason) => {
      //     signale.complete('Disconnected from namespace', deviceSocket.nsp.name, 'Cause', reason)
      //   })
      // } else {
      //   signale.warn('Requested connection on socket for no existing device with id', chalk.yellowBright(deviceId))
      // }
      
    })

  // Register socket for active plugins
  await initPluginsSocket(io)

  io.httpServer.listen(port, () => {
    console.ready(`> Socket ready on http://${hostname}:${port}`)
  })
}