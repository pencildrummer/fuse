import chalk from 'chalk'
import MarlinDriver from '../../../marlin-core/server/MarlinDriver.js';
import { SerialPort } from 'serialport'
import signale from 'signale'

export default class DeviceTerminal {

  _serialPort;
  get serialPort() { return this._serialPort }
  get isOpen() { return this._serialPort?.isOpen || false }

  // The event emitter
  emitter;

  // Device driver
  driver;

  constructor(device, callback) {
    try {
      this._serialPort = new SerialPort({
        path: device.port,
        baudRate: device.baudrate,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        rtscts: false,
        autoOpen: false
      }, callback)
      
      // Init device driver for serial communication
      this.driver = this.initDriver(device)

      // Attach open and error serial port listener for debugging
      this._serialPort.on('open', _ => {
        signale.scope(this.constructor.name).note('Opened port ', device.port, '@', device.baudrate)
      })

      this._serialPort.on('error', err => {
        signale.scope(this.constructor.name).error('Error on port path', device.port, '@', device.baudrate)
        signale.scope(this.constructor.name).error(err)
      })

    } catch(error) {
      signale.error('Error creating serial port for device '+chalk.redBright(device.id), error)
    }
  }

  /**
   * Request serial port connection to open
   */
  open(callback) {
    this._serialPort.open(callback)
  }

  /**
   * Request serial port connection to close
   */
  close(callback) {
    signale.info('Requesting closing connection for device ')
    this._serialPort.close(callback)
  }

  /**
   * Change current baud rate
   * @param {number} baudRate 
   */
  setBaudRate(baudRate, callback) {
    if (!this._serialPort) {
      return signale.error('No serial port to update baud rate')
    }
    this._serialPort.update({
      baudRate: baudRate
    }, callback)
  }

  /**
   * Add event listener to serial port connection
   * @param {string} eventName 
   * @param {*} listener 
   */
  on(eventName, listener) {
    switch (eventName) {
      case 'data':
      case 'ready':
        this.driver.on(eventName, listener)
        break
      default:
        this._serialPort.on(eventName, listener)
        break
    }
  }

  /**
   * Remove event listener from serial port connection
   * @param {string} eventName 
   * @param {*} listener 
   */
  off(eventName, listener) {
    switch (eventName) {
      case 'data':
      case 'ready':
        this.driver.off(eventName, listener)
      default:
        this._serialPort.off(eventName, listener)
    }
  }

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
    this._serialPort.write(message, encoding)
    // let shouldDrain = this._serialPort.write(message, encoding, wait ? undefined : callback)
    // if (shouldDrain || wait)
    //   this._serialPort.drain(callback)
  }

  initDriver(device) {
    // TODO - Get device driver
    //let driverName = device.fuse.driver
    //let driver = getDriver(driverName)
    return new MarlinDriver(this._serialPort)
  }
}