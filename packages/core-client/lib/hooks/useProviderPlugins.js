import { useEffect, useState } from "react";
import ClientPluginManager from "../managers/ClientPluginManager/ClientPluginManager";
import { coreSocket } from "../socket";

export default function useProviderPlugins(data) {
  const [managerReady, setManagerReady] = useState(false);

  useEffect(
    (_) => {
      if (!data) return;

      setManagerReady(ClientPluginManager.shared.ready);

      let initializeClientManager = async (_) => {
        if (!ClientPluginManager.shared.ready) {
          console.log("Initializing ClietPluginManager with data", data);
          await ClientPluginManager.shared.init(data);
          setPlugins(ClientPluginManager.shared.plugins);
          console.log("READY?", ClientPluginManager.shared.ready);
          setManagerReady(ClientPluginManager.shared.ready);
        }
      };

      initializeClientManager().catch((err) => console.error(err));
    },
    [data]
  );

  useEffect((_) => {
    function handleActivation(pluginName) {
      let plugin = ClientPluginManager.shared.getPlugin(pluginName);
      // TODO - Improve this?
      plugin._active = true;
      // Trigger state update
      setPlugins((data) => [...data]);
    }

    function handleDeactivation(pluginName) {
      let plugin = ClientPluginManager.shared.getPlugin(pluginName);
      // TODO - Improve this?
      plugin._active = false;
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

  const [plugins, setPlugins] = useState(ClientPluginManager.shared.plugins);

  return managerReady ? plugins : undefined;
}
