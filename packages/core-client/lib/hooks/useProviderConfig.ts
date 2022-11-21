import { ConfigDataType } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientConfigManager from "../managers/ClientConfigManager/ClientConfigManager";
import { coreSocket } from "../socket";

export default function useProviderConfig(data: ConfigDataType) {
  const [config, setConfig] = useState(ClientConfigManager.shared.config);

  useEffect(() => {
    if (!data) return;

    ClientConfigManager.shared.init(data);
    setConfig(ClientConfigManager.shared.config);
  }, [data]);

  useEffect(() => {
    // TODO: Add listeners for config updates from server
  }, []);

  return config;
}
