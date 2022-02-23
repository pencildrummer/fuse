import { socket } from "lib/client/socket"

export default function initPluginSocket(plugin) {
  if (!plugin.fuse.hasSocket) return
  return socket(plugin.name)
}