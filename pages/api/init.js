import { getDevices } from "lib/core/devices"
import { getPlugins } from "lib/core/plugins"

export default async (req, res) => {

  let data = {
    devices: getDevices(),
    plugins: getPlugins(),
  }

  return res.status(200).json(data)
}