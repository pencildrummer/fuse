import { socket } from "lib/client/socket"
import { useState } from "react"
import { object, string } from "yup"

export default function useProviderPlugins(data) {
  const [plugins, setPlugins] = useState(_ => data?.map(data => initPlugin(data)) || [])
  
  return plugins
}

// TODO - Move to class
function initPlugin(pluginData) {
  let pluginSchema = object({
    name: string().required(),
    version: string().required(),
    fuse: object().required()
  })
  let plugin = pluginSchema.validateSync(pluginData)

  // Init plugin socket if needed
  if (plugin.fuse.hasSocket) {
    plugin.socket = socket(plugin.name)
  }

  return plugin
}