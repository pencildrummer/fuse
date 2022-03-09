import { SerialPort } from "serialport";
import signale from "signale";
import Connection from "../Connection/Connection.js";

export default class SerialConnection extends Connection {

  baudRate;
  opts;

  _serialPort

  constructor(port, baudRate, opts, callback) {
    super()
    try {
      this.baudRate = baudRate
      this.opts = this.opts
      this.initSerialPort(port, callback)
    } catch(error) {
      signale.error('Error creating serial connection on port', port, '@', baudrate)
      signale.error(error)
    }
  }

  get isOpen() {
    return this._serialPort.isOpen
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

  open(callback) {
    this._serialPort.open(callback)
  }

  close(callback) {
    if (this._serialPort.isOpen)
      this._serialPort.close(callback)
  }

  write(data) {
    this._serialPort.write(data)
  }

  addParser(parser) {
    return this._serialPort.pipe(parser)
  }

  /**
   * Private
   */

  initSerialPort(port, callback) {
    this._serialPort = new SerialPort({
      path: port,
      baudRate: this.baudRate,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      rtscts: false,
      ...this.opts,
      autoOpen: false, // Force auto open to false for now
    }, callback)

    // Attach open and error serial port listener for debugging
    this._serialPort.on('open', args => {
      signale.scope(this.constructor.name).note('Opened port ', port, '@', this.baudRate)
      this.emit('open', args)
    })

    this._serialPort.on('close', args => {
      signale.scope(this.constructor.name).info('Closed serial connection on port', port, '@', this.baudRate)
      this.emit('close', args)
    })

    this._serialPort.on('error', err => {
      signale.scope(this.constructor.name).error('Error on port path', port, '@', this.baudRate)
      signale.scope(this.constructor.name).error(err)
      this.emit('error', err)
    })

    this._serialPort.on('data', rawData => {
      signale.scope(this.constructor.name).info('Received data on SerialConnection:', rawData)
      this.emit('data', rawData)
    })
  }
}