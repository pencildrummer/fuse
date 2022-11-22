/// <reference types="node" />
import { EventEmitter } from "events";
import { Device } from "../../devices/index.js";
import { Device as CoreDevice } from "@fuse-labs/types";
/**
 * Abstract class that handle device communication and operations such as requesting info through connection (serial, wi-fi, eth...)
 * or sending jobs (sending GCodes, ...)
 *
 * This class should not be used as it is, it is meant to be subclassed by relative controller types (Marlin, GRBL, etc...)
 */
export default class Controller extends EventEmitter implements CoreDevice.ControllerInterface {
    /**
     * Reference to the device that this instance is controlling
     * @type {Device}
     */
    protected _device: Device;
    get device(): Device;
    constructor(device: any);
    /**
     * Request opening of the connection to the device
     */
    openConnection(callback: any): void;
    /**
     * Request closing of the connection to the device
     */
    closeConnection(callback: any): void;
    /** STATIC */
    static _registeredContollers: {};
    static registerControllerClass(deviceFirmware: any, ControllerClass: any): void;
    static getControllerClass(deviceFirmware: any): any;
}
//# sourceMappingURL=Controller.d.ts.map