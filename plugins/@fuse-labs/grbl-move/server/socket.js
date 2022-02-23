import signale from "signale"
import { getDevice } from "../../../../lib/core/devices.js"

export default (socket) => {

  signale.info('Registering GRBL move')
  socket.on('move:x', (deviceId, xValue, fn) => {

    signale.info('Move required for deviceId', deviceId, xValue)
    if (!deviceId) {
      throw new Error('No device ID provided')
    }

    let device = getDevice(deviceId)
    if (!device) {
      throw new Error('No device found with ID', deviceId)
    }

    device.terminal.send('$I')

    // Sending message to terminal, use device terminal
    // Send G code to move X axis
    // device.G91() // Set relative positioning
    // device.G0_X(xValue) // Request x axis move
    fn?.(true)
  })

}