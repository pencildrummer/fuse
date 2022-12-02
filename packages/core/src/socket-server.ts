import { AppDataType } from "@fuse-labs/types";
import express from "express";
import { createServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { ExtendedError, Namespace } from "socket.io/dist/namespace";
import { logger } from "./logger";
import { DeviceManager } from "./managers/index.js";
import { Device } from "./models/index.js";
import { Device as CoreDevice } from "@fuse-labs/types";
import { getDeviceIdFromSocket } from "./utils/index.js";

// --  Move into separate d file

// Core socket

export interface ServerToClientEvents {
  // Broadcast app data
  "app:data": (data: AppDataType) => void;
  error: (error?: { message: string; code: number }) => void;

  // Plugins
  "plugins:activated": (pluginName: string) => void;
  "plugins:deactivated": (pluginName: string) => void;

  // Devices
  "devices:added": (device: CoreDevice.DataType) => void;
  "devices:updated": (device: CoreDevice.DataType) => void;
  "devices:removed": (device: CoreDevice.DataType) => void;

  // Profiles
  "profiles:added": (profile: CoreDevice.Profile.BaseDataType) => void;
  "profiles:updated": (profile: CoreDevice.Profile.BaseDataType) => void;
  "profiles:deleted": (
    profileId: CoreDevice.Profile.BaseDataType["id"]
  ) => void;
}

export interface ClientToServerEvents {
  // Request updated app data
  "app:data:get": (callback: (data: AppDataType) => void) => void;

  // Serial
  "serial:list": (callback: (list: any[]) => void) => void;

  // Plugins
  "plugins:activate": (
    pluginName: string,
    callback: (result: boolean) => void
  ) => void;
  "plugins:deactivate": (
    pluginName: string,
    callback: (result: boolean) => void
  ) => void;

  // Devices
  "devices:add": (
    data: CoreDevice.DataType,
    callback: (device: CoreDevice.DataType) => void
  ) => void;
  "devices:update": (
    deviceId: CoreDevice.DeviceInterface["id"],
    data: CoreDevice.DataType,
    callback: (device: CoreDevice.DataType) => void
  ) => void;
  "devices:remove": (
    deviceId: CoreDevice.DeviceInterface["id"],
    callback: (device: CoreDevice.DataType) => void
  ) => void;

  // Devices connection
  "devices:connection:check": (
    deviceId: string,
    callback: (portInfo: any) => void
  ) => void;

  // Profiles
  "profiles:add": (
    profile: CoreDevice.Profile.BaseDataType,
    callback: (profile: CoreDevice.Profile.BaseInterface) => void
  ) => void;
  "profiles:update": (
    profileId: CoreDevice.Profile.BaseInterface["id"],
    profileData: CoreDevice.Profile.BaseDataType,
    callback: (profile: CoreDevice.Profile.BaseInterface) => void
  ) => void;
  "profiles:delete": (
    profileId: CoreDevice.Profile.BaseInterface["id"],
    callback: (result: boolean) => void
  ) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export class CoreSocketServer extends SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> {
  error(error: Error) {
    this.emit("error", { message: error.message, code: -1 });
  }
}

export class CoreSocket extends Socket<
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

export class DeviceSocket<
  CTS = ClientToServerDeviceEvents,
  STC = ServerToClientDeviceEvents,
  IS = InterServerDeviceEvents
> extends Socket<CTS, STC, IS, DeviceSocketData> {
  device: Device;
}

// --

// Socket.io server
const expressApp = express();
const httpServer = createServer(expressApp);

// Main socket server (/ namespace)
export const socketServer = new CoreSocketServer(httpServer, {
  cors: {
    origin: [
      // TODO: Allow for configurable hosts, or trust client in some different ways
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://admin.socket.io",
      "http://localhost:5000",
      "null",
    ],
    // credentials: true,
  },
});

// Start socket server
export async function _start_SocketServer() {
  let port = (process.env.SOCKET_PORT as unknown as number) || 8888;

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
export function useDeviceMiddleware(
  socket: DeviceSocket,
  next: (err?: ExtendedError) => void
) {
  let deviceId = getDeviceIdFromSocket(socket);
  if (!deviceId)
    return next(new Error("Missing device ID in socket namespace"));
  let device = DeviceManager.getDevice(deviceId);
  if (!device)
    return next(
      new Error(`Socket unavailable. Device not found with id "${deviceId}"`)
    );

  // Attach found device to socket and namespace
  socket.device = device;

  return next();
}
