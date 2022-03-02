import { useState } from "react"
import ClientPluginManager from '../managers/ClientPluginManager/ClientPluginManager'

export let providerPlugins

export default function useProviderPlugins(data) {

  if (!ClientPluginManager.shared.initialized) {
    ClientPluginManager.shared.init(data)
  }

  const [plugins, setPlugins] = useState(ClientPluginManager.shared.plugins)

  return plugins
}