import { createServer } from 'http'
import { fileURLToPath, parse } from 'url'
import next from 'next'
import { logger } from '@fuse-labs/core/server'
import signale from 'signale'
import path from 'path'
const { Signale } = signale

// Override default console to use Fuse logger
console = logger

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// when using middleware `hostname` and `port` must be provided below
// let projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// console.log('DIR', projectDirectory)
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

let interactive = new Signale({ interactive: true })

interactive.await('Preparing NextJS app')

app.prepare().then(() => {
  interactive.success('App prepared')

  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.ready(`> App ready on http://${hostname}:${port}`)
  })

})