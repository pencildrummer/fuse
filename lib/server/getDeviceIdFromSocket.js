export default function getDeviceIdFromSocket(socket) {
  return getDeviceIdFromNamespace(socket.nsp.name)
}

export function getDeviceIdFromNamespace(string) {
  let regex = new RegExp('[\/]?device:(?<deviceId>[^?\/]+)', 'i')
  return string.match(regex)?.groups?.deviceId
}