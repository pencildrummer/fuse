import PrinterDevice from "../../../../lib/shared/models/PrinterDevice.js";

// TEST - Move in some shared lib
let device;

export default (socket) => {

  // TODO - Replace namespaces in name direclty in passed socket?
  socket.on('openDevice', ({
    portPath,
    baudRate
  }) => {
    device = new PrinterDevice(portPath, baudRate)
  })

  socket.on('move:x', (xValue, fn) => {
    if (!device) {
      console.log('No device port is opened')
      fn?.(false)
      return
    }
    console.log('Requesting mode', xValue)
    // Send G code to move X axis
    device.G91() // Set relative positioning
    device.G0_X(xValue) // Request x axis move
    fn?.(true)
  })
}