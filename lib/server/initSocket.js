import express from "express"
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import signale from 'signale'

import registerSocketPlugins from "./registerSocketPlugins.js"

export default ({ hostname, port }) => {
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
  io.of(/^\/device:[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i)
    .on("connection", async (socket) => {
      signale.success('NAMESPACE', socket.nsp.name)
      await registerSocketPlugins(socket)
      socket.on('disconnect', (reason) => {
        signale.complete('Disconnected from namespace', socket.nsp.name, 'Cause', reason)
      })
    })

  socketServer.listen(port, () => {
    console.log(`> Socket ready on http://${hostname}:${port}`)
  })
}