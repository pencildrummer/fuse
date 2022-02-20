import devices from "lib/core/devices"
import plugins from "lib/core/plugins"
import profiles from "lib/core/profiles"

export default async (req, res) => {

  let data = {
    devices: devices,
    plugins: plugins,
    profiles: profiles
  }
  
  return res.status(200).json(data)
}