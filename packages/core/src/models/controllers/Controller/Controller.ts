import { EventEmitter } from "events";
import { Device } from "../../devices/index.js";
import { Device as CoreDevice } from "@fuse-labs/types";

/**
 * Abstract class that handle device communication and operations such as requesting info through connection (serial, wi-fi, eth...)
 * or sending jobs (sending GCodes, ...)
 *
 * This class should not be used as it is, it is meant to be subclassed by relative controller types (Marlin, GRBL, etc...)
 */
export default class Controller<T extends Device = Device>
  extends EventEmitter
  implements CoreDevice.ControllerInterface
{
  /**
   * Reference to the device that this instance is controlling
   * @type {Device}
   */
  protected _device: T;
  get device() {
    return this._device;
  }

  constructor(device: T) {
    super();
    this._device = device;
    // Add listener to connection to pass it through
    // TODO - Validate? Connection must exists
    this._device.connection.on("error", (err) => this.emit("error", err));

    this._device.connection.on("open", (_) => this.emit("open"));
    this._device.connection.on("close", (_) => this.emit("close"));
  }

  /**
   * Request opening of the connection to the device
   */
  openConnection(callback) {
    this._device.connection.open(callback);
  }

  /**
   * Request closing of the connection to the device
   */
  closeConnection(callback) {
    this._device.connection.close(callback);
  }

  /** STATIC */

  static _registeredContollers: {
    [firmware: string]: typeof Controller;
  } = {};

  static registerControllerClass(
    deviceFirmware: CoreDevice.FirmwareType,
    ControllerClass: typeof Controller
  ) {
    this._registeredContollers[deviceFirmware] = ControllerClass;
  }

  static getControllerClass(
    deviceFirmware: CoreDevice.FirmwareType
  ): typeof Controller {
    return this._registeredContollers[deviceFirmware];
  }
}
