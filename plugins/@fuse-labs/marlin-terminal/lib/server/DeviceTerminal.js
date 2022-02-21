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
          signale.error('Error opening serial connection on port path', port, '@', baudrate)
          callback?.(false)
        } else {
          //console.log(this._serialPort.get())
          callback?.(true)
        }
      })
      // this._serialPort.set({
      //   brk: false,
      //   cts: false,
      //   dtr: false,
      //   dsr: false,
      //   rts: false,
      // })
    } catch(error) {
      signale.error('Error creating serial port for device '+chalk.redBright(device.id), error)
    }
  }

  close() {
    signale.info('Requesting closing connection for device ', this.id)
    this._serialPort.close()
  }

  setBaudRate(baudRate) {
    // TODO - Change baudRate
  }

  send(message) {
    signale.info('Sending message', message)
    this._serialPort.write(message)
  }

}