import { io } from 'socket.io-client'

export default (_ => {
  return io('localhost:8888')
})()