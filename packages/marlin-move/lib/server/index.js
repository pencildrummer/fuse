import { Plugin } from "@fuse-labs/core/server";

export default class MarlinMovePlugin extends Plugin {

  initDeviceSocket(socket) {
    socket.on('move:x', (xValue, fn) => {
      console.log('Requesting mode', xValue)
      // Send G code to move X axis
      socket.device.G91() // Set relative positioning
      socket.device.G0_X(xValue) // Request x axis move
      fn?.(true)
    })
  }

}