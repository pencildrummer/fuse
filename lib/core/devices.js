import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { v4 as uuid } from 'uuid'
import { getProfile } from "./profiles"

const DEVICES_FILE_PATH = path.join(process.cwd(), 'system', 'devices.json')

export function getDevices({ expand = true } = {}) {
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

export function getDevice(deviceId) {
  let device = getDevices().find(device => device.id == deviceId)
  // Expand profile with id
  device.profile = getProfile(device.profileId)
  return device
}

export function addDevice(name, profileId, port, baudrate = 'auto') {
  // TODO - Validate device parameter
  // TODO - Use Device class when able to import ESM
  const device = {
    id: uuid(),
    name: name,
    profileId: profileId,
    port: port,
    baudrate: baudrate
  }

  // Get current system devices
  let devices = getDevices()
  devices.push(device)
  // Set new updated devices list
  setDevices(devices)

  // Return newly added device
  return device
}

// Internal

function setDevices(devices) {
  const devicesContent = JSON.stringify({
    "data": devices
  }, null, 2)
  writeFileSync(DEVICES_FILE_PATH, devicesContent, { encoding: 'utf-8' })
}