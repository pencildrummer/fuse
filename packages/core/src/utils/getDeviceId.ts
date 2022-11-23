// Utilities to retrieve deviceId

import { DeviceSocket } from "../socket-server";

export function getDeviceIdFromSocket(socket: DeviceSocket) {
  console.debug(socket);
  return getDeviceIdFromNamespace(socket.nsp.name);
}

export function getDeviceIdFromNamespace(string: string): string | undefined {
  let regex = new RegExp("[/]?device:(?<deviceId>[^?/]+)", "i");
  return string.match(regex)?.groups?.deviceId;
}
