import express from "express"
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import signale from 'signale'
import chalk from "chalk"
import { DeviceManager, getDeviceIdFromNamespace } from '@fuse-labs/core'
import registerSocketPlugins from "./registerSocketPlugins.js"

export default async function initSocket({ hostname, port }) {

  // Socket.io server
  const expressApp = express()
  const socketServer = createServer(expressApp)

  // Main socket server (/ namespace)
  const io = new SocketServer(socketServer, {
    cors: {
      origin: [
        'http://localhost:3000',
        'https://admin.socket.io'
      ],
      credentials: true,
    }
  })

  // io.on('connection', async (socket) => {
    
  // })
  
  signale.note('Registering device namespace on connection handler')

  // Create devices namespace (eg: /device-42424242-4242-4242-4242-424242424242)
  let deviceRegex = /^\/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i
  // Create name space for device IDs
  io.of(deviceRegex)
    .on("connection", async (deviceSocket) => {
      signale.start('Connected to socket for device:', chalk.blueBright(deviceSocket.nsp.name))
      // Check device exists
      let deviceId = getDeviceIdFromNamespace(deviceSocket.nsp.name)
      let device = DeviceManager.shared.getDevice(deviceId)
      if (device) {
        deviceSocket.on('disconnect', (reason) => {
          signale.complete('Disconnected from namespace', deviceSocket.nsp.name, 'Cause', reason)
        })
      } else {
        signale.warn('Requested connection on socket for no existing device with id', chalk.yellowBright(deviceId))
      }
      
    })

  // Register socket for active plugins
  await registerSocketPlugins(io)

  socketServer.listen(port, () => {
    console.log(`> Socket ready on http://${hostname}:${port}`)
  })
}