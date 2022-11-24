import { ConfigDataType } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientConfigManager from "../managers/ClientConfigManager/ClientConfigManager";
import { coreSocket } from "../socket";

export default function useProviderConfig(data: ConfigDataType) {
  const [config, setConfig] = useState(ClientConfigManager.config);

  useEffect(() => {
    if (!data) return;

    ClientConfigManager.init(data);
    setConfig(ClientConfigManager.config);
  }, [data]);

  useEffect(() => {
    // TODO: Add listeners for config updates from server
  }, []);

  return config;
}
