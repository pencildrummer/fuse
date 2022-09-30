import { useEffect, useState } from "react";
import ClientPluginManager from "../managers/ClientPluginManager/ClientPluginManager";
import { coreSocket } from "../socket";

export default function useProviderPlugins(data) {
  useEffect((_) => {
    let initializeClientManager = async (_) => {
      if (
        !ClientPluginManager.shared.initialized &&
        !ClientPluginManager.shared.loading
      ) {
        await ClientPluginManager.shared.init(data);
        setPlugins(ClientPluginManager.shared.plugins);
      }
    };

    initializeClientManager().catch((err) => console.error(err));
  }, []);

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

  return plugins;
}
