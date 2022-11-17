import { EventEmitter } from 'events'
import { Device } from '../../devices/index.js';

/**
 * Abstract class that handle device communication and operations such as requesting info through connection (serial, wi-fi, eth...)
 * or sending jobs (sending GCodes, ...)
 * 
 * This class should not be used as it is, it is meant to be subclassed by relative controller types (Marlin, GRBL, etc...)
 */
export default class Controller extends EventEmitter {

  /** 
   * Reference to the device that this instance is controlling
   * @type {Device}
   */
  #device;
  get device() { return this.#device }

  constructor(device) {
    super()
    this.#device = device
    // Add listener to connection to pass it through
    // TODO - Validate? Connection must exists
    this.#device.connection.on('error', err => this.emit('error', err))
    
    this.#device.connection.on('open', _ => this.emit('open'))
    this.#device.connection.on('close', _ => this.emit('close'))
  }

  /**
   * Request opening of the connection to the device
   */
  openConnection(callback) {
    this.#device.connection.open(callback)
  }

  /**
   * Request closing of the connection to the device
   */
  closeConnection(callback) {
    this.#device.connection.close(callback)
  }

  /** STATIC */

  static _registeredContollers = {}
  
  static registerControllerClass(deviceFirmware, ControllerClass) {
    this._registeredContollers[deviceFirmware] = ControllerClass
  }
  
  static getControllerClass(deviceFirmware) {
    return this._registeredContollers[deviceFirmware]
  }
}