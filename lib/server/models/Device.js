import SerialPort from "serialport";

export default class Device {

  port // SerialPort
  
  _connected = false
  get connected() { return this._connected }

  // Constructor
  constructor(portPath, baudRate) {
    // Create port connection
    this.port = new SerialPort(portPath, {
      baudRate
    })

    // Listen for successful connection
    this.port.on('open', _ => {
      console.log('Serial port to device opened')
      this._connected = true
    })
  }

}