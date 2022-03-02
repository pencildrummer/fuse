import { useState } from "react"
import ClientPlugin from "../models/ClientPlugin/ClientPlugin"

export let providerPlugins

export default function useProviderPlugins(data) {

  if (!providerPlugins) {
    providerPlugins = data?.map(data => new ClientPlugin(data)) || []
  }

  const [plugins, setPlugins] = useState(providerPlugins)

  return plugins
}