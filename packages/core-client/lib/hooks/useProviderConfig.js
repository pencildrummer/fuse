import { useEffect, useState } from "react";
import ClientConfigManager from "../managers/ClientConfigManager/ClientConfigManager";
import { coreSocket } from "../socket";

export default function useProviderConfig(data) {

  if (!ClientConfigManager.shared.initialized) {
    ClientConfigManager.shared.init(data)
  }

  const [config, setConfig] = useState(ClientConfigManager.shared.config)

  useEffect(_ => {
    // TODO: Add listeners for config updates from server
  }, [])

  return config
}