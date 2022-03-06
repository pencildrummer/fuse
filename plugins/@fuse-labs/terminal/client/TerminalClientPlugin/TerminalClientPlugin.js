import { ClientPlugin, ClientDeviceManager } from '@fuse-labs/core-client'
import Terminal from '../../lib/client/Terminal/Terminal'

export default class TerminalClientPlugin extends ClientPlugin {

  constructor(data) {
    super(data)
    // Add listener to provision plugin on each updated devices event
    ClientDeviceManager.shared.addEventListener('updatedDevices', this.provision)
  }

  provision() {
    console.log('Called provision')
    const devices = ClientDeviceManager.shared.devices
    console.log('Device to provision:', devices)
    // Add terminal to devices ( Terminal is just a class helper to send messages through device connection )
    devices.forEach(device => {
      // Check terminal already exists
      if (device.terminal) {
        console.warn('Trying setting terminal on device but device.terminal already exists')
      } else {
        device.terminal = new Terminal(device)
        console.log('Added terminal plugin to device', device.name)
      }
    })

    // Cleanup method when deactivating plugin
    return _ => {
      devices.forEach(device => {
        if (typeof device.terminal == Terminal) {
          delete device.terminal
        }
      })
    }
  }

}