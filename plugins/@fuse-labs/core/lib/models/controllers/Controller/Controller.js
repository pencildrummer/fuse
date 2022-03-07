import { EventEmitter } from 'events'
import signale from 'signale';

/**
 * Abstract class that handle device communication and operations such as requesting info through connection (serial, wi-fi, eth...)
 * or sending jobs (sending GCodes, ...)
 * 
 * This class should not be used as it is, it is meant to be subclassed by relative controller types (Marlin, GRBL, etc...)
 */
export default class Controller extends EventEmitter {

  // Reference to the device that this instance is controlling
  _device;

  constructor(device) {
    super()
    this._device = device
  }

  static _registeredContollers = {}
  static registerControllerClass(deviceFirmware, ControllerClass) {
    this._registeredContollers[deviceFirmware] = ControllerClass
    signale.debug('Controllers', this._registeredContollers)
  }
  
  static getControllerClass(deviceFirmware) {
    signale.debug('Getting from controllers', this._registeredContollers)
    return this._registeredContollers[deviceFirmware]
  }

}