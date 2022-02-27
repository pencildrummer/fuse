import { useEffect, useRef, useState } from "react"
import ClientPlugin from 'lib/client/models/ClientPlugin'

export let providerPlugins

export default function useProviderPlugins(data) {

  if (!providerPlugins) {
    providerPlugins = data?.map(data => new ClientPlugin(data)) || []
  }

  const [plugins, setPlugins] = useState(providerPlugins)

  return plugins
}