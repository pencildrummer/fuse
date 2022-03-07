import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import signale from 'signale'
import initSocket from './lib/initSocket.js'

// Bootstrap
import './_bootstrap.js'

// Error logger
process.on('uncaughtException', error => signale.error(error.stack))
process.on('unhandledRejection', error => signale.error(error.stack))

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
  
  // Init Socket.io server
  initSocket({ hostname, port: socketPort })

})