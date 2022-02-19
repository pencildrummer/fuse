import { readFileSync, writeFileSync } from "fs"
import path from "path"
import signale from "signale"
import { v4 as uuid } from 'uuid'
import { getProfile } from "./profiles.js"

const DEVICES_FILE_PATH = path.join(process.cwd(), 'system', 'devices.json')

// Retrieve system devices upon init
var devices = getDevices({ expand: true })

// Export list of devices to be reused
export default devices

export function getDevice(deviceId) {
  let device = devices.find(device => device.id == deviceId)
  return device
}

export function addDevice(name, profileId, port, baudrate = 'auto', meta = {}) {
  // TODO - Validate device parameter
  // TODO - Use Device class when able to import ESM
  const device = {
    id: uuid(),
    name: name,
    profileId: profileId,
    port: port,
    baudrate: baudrate,
  }

  if (meta.serialNumber) device.serialNumber = meta.serialNumber
  if (meta.vendorId) device.vendorId = meta.vendorId
  if (meta.productId) device.productId = meta.productId

  // Merge device profile with device obj
  device.profile = getProfile(device.profileId)
  
  // Push new device on current system devices
  devices.push(device)
  // Set new updated devices list
  setDevices(devices)

  // Return newly added device
  return device
}

/**
 * Internal functions
 */

function getDevices({ expand = true } = {}) {
  let devicesContent = readFileSync(DEVICES_FILE_PATH, { encoding: 'utf-8' })
  let devices = JSON.parse(devicesContent)?.data
  if (expand) {
    devices.forEach(device => {
      // Expand profile with id
      device.profile = getProfile(device.profileId)
    })
  }
  return devices
}

function setDevices(devices) {
  const devicesContent = JSON.stringify({
    "data": devices
  }, null, 2)
  writeFileSync(DEVICES_FILE_PATH, devicesContent, { encoding: 'utf-8' })
}