import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

import express from 'express'
import { Server as SocketServer } from 'socket.io'
import registerSocketPlugins from './lib/server/registerSocketPlugins.js'
import signale from 'signale'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const socketPort = 8888

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })

  // Socket.io server
  const expressApp = express()
  const socketServer = createServer(expressApp)
  
  const io = new SocketServer(socketServer, {
    cors: {
      origin: '*'
      // origin: `http://${hostname}:${socketPort}`,
      // methods: ['GET', 'POST']
    }
  })

  io.on('connection', async (socket) => {
    // Register all socket binds
    await registerSocketPlugins(socket)    
  })
  
  socketServer.listen(socketPort, () => {
    console.log(`> Socket ready on http://${hostname}:${socketPort}`)
  })

})