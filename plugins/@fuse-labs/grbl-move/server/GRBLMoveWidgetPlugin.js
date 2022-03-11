import { Plugin } from '@fuse-labs/core/server'
export default class GRBLMoveWidgetPlugin extends Plugin {

  initDeviceSocket(socket) {
    signale.info('Registering GRBL move')
    socket.on('move:x', (deviceId, xValue, fn) => {

      signale.info('Move required:', xValue)

      socket.device.terminal.send('$I')

      // Sending message to terminal, use device terminal
      // Send G code to move X axis
      // device.G91() // Set relative positioning
      // device.G0_X(xValue) // Request x axis move
      fn?.(true)
    })
  }
}