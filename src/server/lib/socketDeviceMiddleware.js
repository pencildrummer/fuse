import { DeviceManager, getDeviceIdFromSocket } from '@fuse-labs/core/server'

export default function useDeviceMiddleware(socket, next) {
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