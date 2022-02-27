export default function getDeviceIdFromSocket(socket) {
  let regex = new RegExp('[\/]?device:(?<deviceId>[^?\/]+)', 'i')
  let deviceId = socket.nsp.name.match(regex)?.groups?.deviceId
  return deviceId
}