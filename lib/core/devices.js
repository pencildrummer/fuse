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

export function addDevice(data) {

  // TODO - Validate device parameter
  // TODO - Use Device class when able to import ESM
  const device = {
    id: uuid(),
    name: data.name,
    profileId: data.profileId,
    port: data.port,
    baudrate: data.baudrate,
    serialNumber: data.serialNumber,
    vendorId: data.vendorId,
    productId: data.productId,
  }

  // Merge device profile with device obj
  device.profile = getProfile(device.profileId)
  
  // Push new device on current system devices
  devices.push(device)
  // Set new updated devices list
  setDevices(devices)

  // Return newly added device
  return device
}

export function updateDevice(deviceId, data) {
  let device = getDevice(deviceId)
  // TODO - Validate data
  device = {
    ...device,
    ...data
  }

  // Merge device profile with device obj
  device.profile = getProfile(device.profileId)

  // TODO - Optimized, we are doing the same thing as getDevice but just for the index
  let deviceIndex = devices.findIndex(d => d.id === deviceId)
  if (!deviceIndex) {
    return signale.error('Unexpected error updating device')
  }
  // Replace in memory device with updated one
  devices[deviceIndex] = device
  // Updated system file devices list
  setDevices(devices)
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
  let storeDevices = devices.map(d => {
    // Expand to remove profile expanded object
    const { profile, ...device } = d
    return device
  })
  const devicesContent = JSON.stringify({
    "data": storeDevices
  }, null, 2)
  writeFileSync(DEVICES_FILE_PATH, devicesContent, { encoding: 'utf-8' })
}