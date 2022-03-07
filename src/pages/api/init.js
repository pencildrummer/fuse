import { DeviceManager, PluginManager, profiles } from "@fuse-labs/core"

export default async function init(req, res) {

  let data = {
    devices: DeviceManager.shared.devices,
    plugins: PluginManager.shared.plugins,
    profiles: profiles
  }
  
  return res.status(200).json(data)
}