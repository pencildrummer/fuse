import { Plugin, DeviceType } from '@fuse-labs/core'

export default class MarlinSettingsPlugin extends Plugin {

  get deviceTypes() {
    return [
      DeviceType.FDMPrinter,
    ]
  }

  initDeviceSocket(socket) {
    // TODO - Add listener method on DeviceTerminal
    // TODO - Add listener on device.terminal for received data (improved with serial port parser to trigger handler on certain events?)
    // TODO - In the listener, emit on the socket namespaces the correct event
    
    socket.on('settings:read', (deviceId, fn) => {
      if (!socket.device.terminal) {
        console.warn('Requested settings but no device terminal is available')
        return fn?.(false)
      }

      // TODO - Uniform newline checking, from client is already done, in server side is not
      socket.device.terminal.send('M115\n')

      // Send device terminal request for settings
      fn?.(true)
    })

  }
}