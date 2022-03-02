import fs from "fs-extra"
import path from "path"
import signale from "signale"
import { DEVICES_BASE_PATH } from "./constants.js"
import Device from './models/devices/Device/Device.js'

// Retrieve system devices upon init
// Export list of devices to be reused
export var devices = getDevices()

export function getDevice(deviceId) {
  return devices?.find(device => device.id == deviceId)
}

export function addDevice(data) {

  // TODO - Validate device parameter
  // TODO - Use Device class when able to import ESM
  let device = new Device(data)
  console.log('Adding', device)
  // Save device on file system
  device.save()

  // Push new device on current system devices
  devices.push(device)

  // Return newly added device
  return device
}

export function updateDevice(deviceId, data) {
  // Get device to update
  let device = getDevice(deviceId)
  // Update device data
  device.update(data)
  return device
}

export function removeDevice(deviceId) {
  let device = getDevice(deviceId)
  if (!device) {
    return signale.error('Unable found device to remove -', deviceId)
  }
  // Remove device file from file system
  device.delete()
  // Replace in memory device removing device
  devices = devices.filter(d => d.id !== deviceId)
  // Return the remove device
  return device
}

/**
 * Internal functions
 */

function getDevices() {
  // Ensure directory exists, if dir has been removed it will be created
  fs.ensureDirSync(DEVICES_BASE_PATH)
  let entries = fs.readdirSync(DEVICES_BASE_PATH, { withFileTypes: true})
  return entries.reduce((entries, entry) => {
    if (entry.isFile()) {
      // Check for correct extension
      if (path.extname(entry.name) == '.json') {
        // Read file content
        let device = new Device(path.join(DEVICES_BASE_PATH, entry.name))
        if (device) {
          return [...entries, device]
        }
      }
    }
    return entries
  }, [])
}

// Utilities to retrieve deviceId

export function getDeviceIdFromSocket(socket) {
  return getDeviceIdFromNamespace(socket.nsp.name)
}

export function getDeviceIdFromNamespace(string) {
  let regex = new RegExp('[\/]?device:(?<deviceId>[^?\/]+)', 'i')
  return string.match(regex)?.groups?.deviceId
}