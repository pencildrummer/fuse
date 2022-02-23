import { io } from 'socket.io-client'

const SOCKET_HOST = 'localhost:8888'

function socket(namespace) {
  let ns = [SOCKET_HOST, namespace].join('/')
    .replace('@', 'scope:')
  let socket = io(ns)
  socket.on('connect', _ => {
    console.log('Connected to socket namespace: ', namespace || '/')
  })
  return socket
}

const mainSocket = socket()

export default mainSocket
export {
  socket
}