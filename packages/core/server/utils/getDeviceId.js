// Utilities to retrieve deviceId
export function getDeviceIdFromSocket(socket) {
    console.debug(socket);
    return getDeviceIdFromNamespace(socket.nsp.name);
}
export function getDeviceIdFromNamespace(string) {
    let regex = new RegExp("[/]?device:(?<deviceId>[^?/]+)", "i");
    return string.match(regex)?.groups?.deviceId;
}
