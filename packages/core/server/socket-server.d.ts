/// <reference types="node" />
import { Server as SocketServer, Socket } from "socket.io";
import { ExtendedError, Namespace } from "socket.io/dist/namespace";
import { Device } from "./models/index.js";
export interface ServerToClientEvents {
    error: (error?: {
        message: string;
        code: number;
    }) => void;
}
export interface ClientToServerEvents {
}
export interface InterServerEvents {
}
export interface SocketData {
}
export declare class CoreSocketServer extends SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> {
    error(error: Error): void;
}
export declare class CoreSocket extends Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> {
}
export interface ServerToClientDeviceEvents {
    error: (error?: {
        message: string;
        code: number;
    }) => void;
}
export interface ClientToServerDeviceEvents {
}
export interface InterServerDeviceEvents {
}
export interface DeviceSocketData {
}
export type DeviceNamespace = Namespace<ClientToServerDeviceEvents, ServerToClientDeviceEvents, InterServerDeviceEvents, DeviceSocketData>;
export declare class DeviceSocket extends Socket<ClientToServerDeviceEvents, ServerToClientDeviceEvents, InterServerDeviceEvents, DeviceSocketData> {
    device?: Device;
}
declare const io: CoreSocketServer;
export default io;
export declare function _start_SocketServer(): Promise<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>;
/**
 * Socket.io middleware to automatically retrieve device from namespaced endpoint in socket
 * @param {*} socket
 * @param {*} next
 * @returns
 */
export declare function useDeviceMiddleware(socket: DeviceSocket, next: (err?: ExtendedError) => void): void;
//# sourceMappingURL=socket-server.d.ts.map