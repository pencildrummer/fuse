import express from "express";
import { createServer, Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { ExtendedError, Namespace } from "socket.io/dist/namespace";
import { DeviceManager } from "./managers";
import { Device } from "./models";
import { getDeviceIdFromSocket } from "./utils";

// --  Move into separate d file

// Core socket

export interface ServerToClientEvents {}

export interface ClientToServerEvents {}

export interface InterServerEvents {}

export interface SocketData {}

export declare class CoreSocket extends SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> {}

// Device socket

export interface ServerToClientDeviceEvents {
  error: (error?: { message: string; code: number }) => void;
}
export interface ClientToServerDeviceEvents {}
export interface InterServerDeviceEvents {}
export interface DeviceSocketData {}

export type DeviceNamespace = Namespace<
  ClientToServerDeviceEvents,
  ServerToClientDeviceEvents,
  InterServerDeviceEvents,
  DeviceSocketData
>;

export declare class DeviceSocket extends Socket<
  ClientToServerDeviceEvents,
  ServerToClientDeviceEvents,
  InterServerDeviceEvents,
  DeviceSocketData
> {
  device?: Device;
}

// --

// Socket.io server
const expressApp = express();
const httpServer = createServer(expressApp);

// Main socket server (/ namespace)
const io = new CoreSocket(httpServer, {
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
  let port = (process.env.SOCKET_PORT as unknown as number) || 8888;

  return httpServer.listen(port, () => {
    console.log(`> Socket ready on PORT: ${port}`);
  });
}

/**
 * Socket.io middleware to automatically retrieve device from namespaced endpoint in socket
 * @param {*} socket
 * @param {*} next
 * @returns
 */
export function useDeviceMiddleware(
  socket: DeviceSocket,
  next: (err?: ExtendedError) => void
) {
  let deviceId = getDeviceIdFromSocket(socket);
  if (!deviceId)
    return next(new Error("Missing device ID in socket namespace"));
  let device = DeviceManager.shared.getDevice(deviceId);
  if (!device)
    return next(
      new Error(`Socket unavailable. Device not found with id "${deviceId}"`)
    );

  // Attach found device to socket and namespace
  socket.device = device;

  return next();
}
