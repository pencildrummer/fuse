import { addDevice, removeDevice, updateDevice } from "../../../../lib/core/devices.js"
import { SerialPort } from "serialport"
import { addProfile, updateProfile, deleteProfile } from "../../../../lib/core/profiles.js"
import signale from "signale"

export default (socket) => {
  socket.on('core.serial.list', async (name, fn) => {
    SerialPort.list().then(list => {
      fn(list)
    }).catch(e => fn(e))
  })

  /*
  ** Devices
  */

  socket.on('core.devices.add', async ({
    name, 
    profile,
    profileId,
    port,
    baudrate,
    serialNumber,
    vendorId,
    productId
  }, fn) => {
    if (profile) {
      // TODO - Add device profile on the go, for custom profiles while saving device
      profileId = profile.id
    }
    // Add device to the system
    let device = addDevice({
      name,
      profileId,
      port,
      baudrate,
      serialNumber,
      vendorId,
      productId
    })
    if (device) {
      // Broadcast new device creation
      socket.emit('core.devices.added', device)
    }
    // Return created device to callback function
    fn(device)
  })

  // Update

  socket.on('core.devices.update', async (deviceId, data, fn) => {
    // Add device to the system
    let device = updateDevice(deviceId, data)
    if (device) {
      // Broadcast new device creation
      socket.emit('core.devices.updated', device)
    }
    // Return updated device to callback function
    fn?.(device)
  })

  // Remove

  socket.on('core.devices.remove', async (deviceId, fn) => {
    // Add device to the system
    let device = removeDevice(deviceId)
    if (device) {
      // Broadcast new device creation
      socket.emit('core.devices.removed', device)
    }
    // Return updated device to callback function
    fn?.(device)
  })

  /**
   * Device connections
   */

  // Check if device is available by searching and comparing metadata of serial ports avaialble
  socket.on('core.devices.connection.check', async (device, fn) => {
    let list = await SerialPort.list()
    let devicePort = list.find(port => port.path == device.port)
    return fn?.(devicePort)
  })

  /**
   * Profiles
   */
  socket.on('core.profiles.add', async(profileData, fn) => {
    let profile = addProfile(profileData)
    if (profile) {
      socket.emit('core.profiles.added', profile)
    }
    fn(profile)
  })

  socket.on('core.profiles.update', async(id, profileData, fn) => {
    let profile = updateProfile(id, profileData)
    if (profile) {
      socket.emit('core.profiles.updated', profile)
    }
    fn(profile)
  })

  socket.on('core.profiles.delete', async(id, fn) => {
    if (deleteProfile(id)) {
      socket.emit('core.profiles.deleted', id)
      fn(true)
    }
    fn(false)
  })

}