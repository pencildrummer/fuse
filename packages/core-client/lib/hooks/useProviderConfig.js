import { useEffect, useState } from "react";
import ClientConfigManager from "../managers/ClientConfigManager/ClientConfigManager";
import { coreSocket } from "../socket";

export default function useProviderConfig(data) {
  const [config, setConfig] = useState(ClientConfigManager.shared.config);

  useEffect(
    (_) => {
      if (!data) return;

      ClientConfigManager.shared.init(data);
      setConfig(ClientConfigManager.shared.config);
    },
    [data]
  );

  useEffect((_) => {
    // TODO: Add listeners for config updates from server
  }, []);

  return config;
}
