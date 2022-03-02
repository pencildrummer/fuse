import { devices, plugins, profiles } from "@fuse-labs/core"

export default async function init(req, res) {

  let data = {
    devices: devices,
    plugins: plugins,
    profiles: profiles
  }
  
  return res.status(200).json(data)
}