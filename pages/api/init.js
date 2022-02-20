import devices from "lib/core/devices"
import plugins from "lib/core/plugins"
import { getProfiles } from "lib/core/profiles"

export default async (req, res) => {

  let data = {
    devices: devices,
    plugins: plugins,
    profiles: getProfiles()
  }
  
  return res.status(200).json(data)
}