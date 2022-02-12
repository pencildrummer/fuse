import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { v4 as uuid } from 'uuid'

const DEVICES_FILE_PATH = path.join(process.cwd(), 'system', 'devices.json')

export function getDevices() {
  let devicesContent = readFileSync(DEVICES_FILE_PATH, { encoding: 'utf-8' })
  return JSON.parse(devicesContent)?.data
}

export function getDevice(deviceId) {
  return getDevices().find(device => device.id == deviceId)
}

export function addDevice(name, profile, port, baudrate = 'auto') {
  // TODO - Validate device parameter
  // TODO - Use Device class when able to import ESM
  const device = {
    id: uuid(),
    name: name,
    profileId: profile.id,
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