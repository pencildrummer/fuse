import chalk from 'chalk'
import { SerialPort } from 'serialport'
import signale from 'signale'

export default class DeviceTerminal {

  _serialPort;
  get serialPort() { return this._serialPort }
  get isOpen() { return this._serialPort?.isOpen || false }

  // The event emitter
  emitter;

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
      this._serialPort.on('open', _ => {
        signale.note('Opened port ', device.port, '@', device.baudrate)
      })
      this._serialPort.on('error', err => {
        signale.error('Error opening serial connection on port path', device.port, '@', device.baudrate)
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
    signale.info('Requesting closing connection for device ', this.id)
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
    this._serialPort.on(eventName, listener)
  }

  /**
   * Remove event listener from serial port connection
   * @param {string} eventName 
   * @param {*} listener 
   */
  off(eventName, listener) {
    this._serialPort.off(eventName, listener)
  }

  /**
   * Send message on device serial port
   * @param {string | Buffer} message 
   * @returns 
   */
  send(message, encoding, callback) {
    if (!this.isOpen) {
      return signale.error('Unable to send message. Port is not open.')
    }
    signale.info('Sending message', message)
    this._serialPort.write(message, encoding, callback)
  }

}