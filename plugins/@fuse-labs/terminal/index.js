import { Terminal } from "./lib/client/terminal"

export function initClientPlugin(ctx) {
  const { devices } = ctx
  // Add terminal to devices ( Terminal is just a class helper to send messages through device connection )
  devices.forEach(device => {
    // Check terminal already exists
    if (device.terminal) {
      console.warn('Trying setting terminal on device but device.terminal already exists')
    } else {
      device.terminal = new Terminal(device)
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