import { readFileSync } from "fs"
import path from "path"
import { getActivePluginsWithInfo } from "../core/plugins"

export default async function getServerSideDeviceProp(ctx) {
  const { query } = ctx
  const { deviceID } = query
  
  // Retrieve device with requested ID
  let devicesContent = readFileSync(path.join(process.cwd(), 'system', 'devices.json'))
  let devices = JSON.parse(devicesContent)?.data || []
  let device = devices.find(device => device.id == deviceID)

  if (device) {
    // Get all active plugins in Fuse
    let activePlugins = getActivePluginsWithInfo()
      // Filter out system plugins
      .filter(p => p.fuse?.type != 'system')
      // Filter plugins for device type
      .filter(p => p.fuse?.devices?.includes(device.type))
    // Attach active plugins to the device
    device.plugins = activePlugins
  }

  return device
}