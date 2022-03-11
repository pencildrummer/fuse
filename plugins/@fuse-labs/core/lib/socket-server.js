import express from 'express'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { DeviceManager } from './managers/index.js'
import { getDeviceIdFromSocket } from './utils/index.js'

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

/**
 * Socket.io middleware to automatically retrieve device from namespaced endpoint in socket
 * @param {*} socket 
 * @param {*} next 
 * @returns 
 */
export function useDeviceMiddleware(socket, next) {
  let deviceId = getDeviceIdFromSocket(socket)
  if (!deviceId)
    return next(new Error('Missing device ID in socket namespace'))
  let device = DeviceManager.shared.getDevice(deviceId)
  if (!device)
    return next(new Error(`Socket unavailable. Device not found with id "${deviceId}"`))
  
  // Attach found device to socket
  socket.device = device

  return next()
}