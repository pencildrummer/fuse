import { io } from 'socket.io-client'

export default function socket() {
  return io('localhost:8888')
}