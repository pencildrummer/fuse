import express from "express"
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import signale from 'signale'
import { instrument } from '@socket.io/admin-ui'

import registerSocketPlugins from "./registerSocketPlugins.js"
import chalk from "chalk"
import { getDevice } from '../core/devices.js'
import { getDeviceIdFromNamespace } from './getDeviceIdFromSocket.js'

export default async ({ hostname, port }) => {
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

  // Admin UI - See: https://socket.io/docs/v4/admin-ui/
  // instrument(io, {
  //   auth: {
  //     type: 'basic',
  //     username: 'admin',
  //     password: '$2b$10$AKjHFGLz595fbLQoeCRxM.0vRPe9J3V8H8CU/S8g5PMFHkQKdK6by' // fuse2020
  //   },
  //   namespaceName: '/'
  // })

  // io.on('connection', async (socket) => {
  //   // Register all socket binds
  //   //await registerSocketPlugins(socket)    
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
      let device = getDevice(deviceId)
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