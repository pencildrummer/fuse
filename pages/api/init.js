import { getDevices } from "lib/core/devices"
import { getPlugins } from "lib/core/plugins"
import { getProfiles } from "lib/core/profiles"

export default async (req, res) => {

  let data = {
    devices: getDevices(),
    plugins: getPlugins(),
    profiles: getProfiles()
  }
  
  return res.status(200).json(data)
}