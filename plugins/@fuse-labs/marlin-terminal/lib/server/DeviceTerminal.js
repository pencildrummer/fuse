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
      }, (err) => {
        if (err) {
          signale.error('Error opening serial connection on port path', device.port, '@', device.baudrate)
          callback?.(err)
        } else {
          callback?.()
        }
      })
    } catch(error) {
      signale.error('Error creating serial port for device '+chalk.redBright(device.id), error)
    }
  }

  /**
   * Request serial port connection to close
   */
  close() {
    signale.info('Requesting closing connection for device ', this.id)
    this._serialPort.close()
  }

  /**
   * Change current baud rate
   * @param {number} baudRate 
   */
  setBaudRate(baudRate) {
    if (!this._serialPort) {
      return signale.error('No serial port to update baud rate')
    }
    this._serialPort.update({
      baudRate: baudRate
    })
  }

  /**
   * Send message on device serial port
   * @param {string | Buffer} message 
   * @returns 
   */
  send(message) {
    if (!this.isOpen) {
      return signale.error('Unable to send message. Port is not open.')
    }
    signale.info('Sending message', message)
    this._serialPort.write(message)
  }

}