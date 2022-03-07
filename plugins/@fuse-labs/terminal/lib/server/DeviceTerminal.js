import chalk from 'chalk'
import signale from 'signale'
import { EventEmitter } from 'events'

export default class DeviceTerminal extends EventEmitter {

  // _serialPort;
  // get serialPort() { return this._serialPort }
  get isOpen() { return this._device.connection?.isOpen || false }

  // Device
  _device;

  constructor(device) {
    super()
    try {
      if (!device.connection)
        throw new Error('No connection on device')
      if (!device.controller) 
        throw new Error('No controller on device')
      // Add reference to device
      this._device = device
      // Add listener to controller
      this._device.controller.on('data', data => this.emit('data', data))
    } catch(error) {
      signale.error('Error creating terminal for device '+chalk.redBright(device.id), error)
    }
  }

  /**
   * Request serial port connection to open
   */
  open(callback) {
    this._device.connection.open(callback)
    //this._serialPort.open(callback)
  }

  /**
   * Request serial port connection to close
   */
  close(callback) {
    signale.info('Requesting closing connection for device ')
    this._device.connection.close(callback)
    //this._serialPort.close(callback)
  }

  // /**
  //  * Add event listener to serial port connection
  //  * @param {string} eventName 
  //  * @param {*} listener 
  //  */
  // on(eventName, listener) {
  //   switch (eventName) {
  //     case 'data':
  //     case 'ready':
  //       this.driver.on(eventName, listener)
  //       break
  //     default:
  //       this._serialPort.on(eventName, listener)
  //       break
  //   }
  // }

  // /**
  //  * Remove event listener from serial port connection
  //  * @param {string} eventName 
  //  * @param {*} listener 
  //  */
  // off(eventName, listener) {
  //   switch (eventName) {
  //     case 'data':
  //     case 'ready':
  //       this.driver.off(eventName, listener)
  //     default:
  //       this._serialPort.off(eventName, listener)
  //   }
  // }

  /**
   * Send message on device serial port
   * @param {string | Buffer} message 
   * @returns 
   */
  send(message, encoding, callback, wait = false) {
    if (!this.isOpen) {
      return signale.error('Unable to send message. Port is not open.')
    }
    signale.info('Sending message', message)
    
    this._device.controller.write(message)
    //this._serialPort.write(message, encoding)

    // let shouldDrain = this._serialPort.write(message, encoding, wait ? undefined : callback)
    // if (shouldDrain || wait)
    //   this._serialPort.drain(callback)
  }

  // initDriver(device) {
  //   // TODO - Get device driver
  //   //let driverName = device.fuse.driver
  //   //let driver = getDriver(driverName)
  //   return new MarlinDriver(this._serialPort)
  // }
}