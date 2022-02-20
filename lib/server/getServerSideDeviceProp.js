import { getDevice } from "../core/devices"
import { getActivePlugins } from "../core/plugins"

export default async function getServerSideDeviceProp(ctx) {
  const { query } = ctx
  const { deviceID } = query
  
  // Retrieve device with requested ID
  let device = getDevice(deviceID)

  if (device) {
    // Get all active plugins in Fuse
    let activePlugins = getActivePlugins()
      // Filter out system plugins
      .filter(p => p.fuse?.type != 'system')
      // Filter plugins for device type
      .filter(p => p.fuse?.devices?.includes(device.profile.type))
    // Attach active plugins to the device
    device.plugins = activePlugins
  }

  return device
}