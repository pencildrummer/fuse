import express from 'express'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'

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
export default io