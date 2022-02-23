import express from "express"
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import signale from 'signale'

import registerSocketPlugins from "./registerSocketPlugins.js"
import chalk from "chalk"

export default async ({ hostname, port }) => {
  // Socket.io server
  const expressApp = express()
  const socketServer = createServer(expressApp)

  // Main socket server (/ namespace)
  const io = new SocketServer(socketServer, {
    cors: {
      origin: '*'
      // origin: `http://${hostname}:${port}`,
      // methods: ['GET', 'POST']
    }
  })

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
      signale.info('Connected to socket for device:', chalk.blueBright(deviceSocket.nsp.name))
      deviceSocket.on('disconnect', (reason) => {
        signale.complete('Disconnected from namespace', deviceSocket.nsp.name, 'Cause', reason)
      })
    })

  // Register socket for active plugins
  await registerSocketPlugins(io)

  socketServer.listen(port, () => {
    console.log(`> Socket ready on http://${hostname}:${port}`)
  })
}