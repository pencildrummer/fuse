import chalk from 'chalk'
import { SerialPort } from 'serialport'
import signale from 'signale'

export default class DeviceTerminal {

  _serialPort;
  get serialPort() { return this._serialPort }
  get isOpen() { return this._serialPort?.isOpen || false }

  constructor(device) {
    try {
      this._serialPort = new SerialPort({
        path: device.port,
        baudRate: device.baudrate
      }, (err) => {
        if (err) {
          signale.error('Error opening serial connection on port path', port, '@', baudrate)
          fn?.(false)
        } else {
          fn?.(true)
        }
      })
    } catch(error) {
      signale.error('Error creating serial port for device '+chalk.redBright(device.id), error)
    }
  }

  close() {
    this._serialPort.close()
  }

  setBaudRate(baudRate) {
    // TODO - Change baudRate
  }

  send(message) {
    this._serialPort.write(message)
  }
}