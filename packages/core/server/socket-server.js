import express from "express";
import { createServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { logger } from "./logger.js";
import { DeviceManager } from "./managers/index.js";
import { getDeviceIdFromSocket } from "./utils/index.js";
export class CoreSocketServer extends SocketServer {
    error(error) {
        this.emit("error", { message: error.message, code: -1 });
    }
}
export class CoreSocket extends Socket {
}
export class DeviceSocket extends Socket {
}
// --
// Socket.io server
const expressApp = express();
const httpServer = createServer(expressApp);
// Main socket server (/ namespace)
const io = new CoreSocketServer(httpServer, {
    cors: {
        origin: [
            // TODO: Allow for configurable hosts, or truste client in some different ways
            "http://localhost:3000",
            "http://localhost:3001",
            "https://admin.socket.io",
            "http://localhost:5000",
            "null",
        ],
        credentials: true,
    },
});
export default io;
// Start socket server
export async function _start_SocketServer() {
    let port = process.env.SOCKET_PORT || 8888;
    return httpServer.listen(port, () => {
        logger.ready(`> Socket ready on PORT: ${port}`);
    });
}
/**
 * Socket.io middleware to automatically retrieve device from namespaced endpoint in socket
 * @param {*} socket
 * @param {*} next
 * @returns
 */
export function useDeviceMiddleware(socket, next) {
    let deviceId = getDeviceIdFromSocket(socket);
    if (!deviceId)
        return next(new Error("Missing device ID in socket namespace"));
    let device = DeviceManager.shared.getDevice(deviceId);
    if (!device)
        return next(new Error(`Socket unavailable. Device not found with id "${deviceId}"`));
    // Attach found device to socket and namespace
    socket.device = device;
    return next();
}
