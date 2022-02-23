import { io } from 'socket.io-client'

const SOCKET_HOST = 'localhost:8888'

function socket(namespace) {
  return io([SOCKET_HOST, namespace].join('/'))
}

const mainSocket = socket()

export default mainSocket
export {
  socket
}