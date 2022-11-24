import { PluginDataType } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientPluginManager from "../managers/ClientPluginManager/ClientPluginManager";
import { coreSocket } from "../socket";

export default function useProviderPlugins(data: {
  [key: string]: PluginDataType;
}) {
  const [managerReady, setManagerReady] = useState(false);

  useEffect(() => {
    if (!data) return;

    setManagerReady(ClientPluginManager.ready);

    let initializeClientManager = async () => {
      if (!ClientPluginManager.ready) {
        console.log("Initializing ClietPluginManager with data", data);
        await ClientPluginManager.init(data);
        setPlugins(ClientPluginManager.plugins);
        console.log("READY?", ClientPluginManager.ready);
        setManagerReady(ClientPluginManager.ready);
      }
    };

    initializeClientManager().catch((err) => console.error(err));
  }, [data]);

  useEffect(() => {
    function handleActivation(pluginName) {
      let plugin = ClientPluginManager.getPlugin(pluginName);
      // TODO - Improve this? Tshi should throw, update from host instead
      plugin.active = true;
      // Trigger state update
      setPlugins((data) => [...data]);
    }

    function handleDeactivation(pluginName) {
      let plugin = ClientPluginManager.getPlugin(pluginName);
      // TODO - Improve this? Tshi should throw, update from host instead
      plugin.active = false;
      // Trigger state update
      setPlugins((data) => [...data]);
    }

    // Add listener to coreSocket for plugin events
    coreSocket.on("plugins:activated", handleActivation);
    coreSocket.on("plugins:deactivated", handleDeactivation);
    (_) => {
      // Remove listeners
      coreSocket.off("plugins:activated", handleActivation);
      coreSocket.off("plugins:deactivated", handleDeactivation);
    };
  }, []);

  const [plugins, setPlugins] = useState(ClientPluginManager.plugins);

  return managerReady ? plugins : undefined;
}
