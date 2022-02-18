import { addDevice } from "../../../../lib/core/devices.js"
import { SerialPort } from "serialport"
import { addProfile, updateProfile, deleteProfile } from "../../../../lib/core/profiles.js"

export default (socket) => {
  socket.on('core.serial.list', async (name, fn) => {
    SerialPort.list().then(list => {
      fn(list)
    }).catch(e => fn(e))
  })

  /*
  ** Devices
  */

  socket.on('core.devices.add', async ({ name, profile, profileId, port, baudrate }, fn) => {
    if (profile) {
      // TODO - Add device profile on the go, for custom profiles while saving device
      profileId = profile.id
    }
    // Add device to the system
    let device = addDevice(name, profileId, port, baudrate)
    if (device) {
      // Broadcast new device creation
      socket.emit('core.devices.added', device)
    }
    // Return created device to callback function
    fn(device)
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