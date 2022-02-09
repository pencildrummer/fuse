import { readFileSync } from "fs"
import path from "path"

export function getDevices() {
  let devicesContent = readFileSync(path.join(process.cwd(), 'system', 'devices.json'))
  return JSON.parse(devicesContent)?.data
}

export function getDevice(deviceId) {
  return getDevices().find(device => device.id == deviceId)
}