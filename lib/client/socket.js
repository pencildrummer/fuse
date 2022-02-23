import { io } from 'socket.io-client'

const SOCKET_HOST = 'localhost:8888'

/**
 * Create new socket to connect to underlysing server sorckets.
 * @param {string} namespace 
 * @returns 
 */
function socket(namespace) {
  let ns = [SOCKET_HOST, namespace].join('/')
    .replace('@', 'scope:')
  let socket = io(ns)
  socket.on('connect', _ => {
    // console.log('Connected to socket namespace: ', namespace || '/')
  })
  return socket
}

/**
 * The default socket, communicating with the @fuse-labs/core socket
 */
const coreSocket = socket('@fuse-labs/core')

export default coreSocket
export {
  socket
}