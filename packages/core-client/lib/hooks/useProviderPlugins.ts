import { PluginDataType } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientPluginManager from "../managers/ClientPluginManager/ClientPluginManager";
import { ClientPlugin } from "../models/index.js";
import { coreSocket } from "../socket";

export default function useProviderPlugins(data: {
  [key: string]: PluginDataType;
}) {
  const [plugins, setPlugins] = useState<ClientPlugin[] | null>();

  useEffect(() => {
    if (!data) return;
    (async () => {
      await ClientPluginManager.configurePluginsFromData(data);
      console.log(
        "Updated plugins with new data:",
        ClientPluginManager.plugins
      );
      setPlugins(ClientPluginManager.plugins);
    })();
  }, [data]);

  useEffect(() => {
    function handleActivation(pluginName) {
      // console.log("Activated event handler from useProviderPlugins");
      // throw new Error(
      //   "TODO: Implement updated status from plugin manager broadcast event"
      // );
    }

    function handleDeactivation(pluginName) {
      // throw new Error(
      //   "TODO: Implement updated status from plugin manager broadcast event"
      // );
    }

    // Add listener to coreSocket for plugin events
    coreSocket.on("plugins:activated", handleActivation);
    coreSocket.on("plugins:deactivated", handleDeactivation);
    () => {
      // Remove listeners
      coreSocket.off("plugins:activated", handleActivation);
      coreSocket.off("plugins:deactivated", handleDeactivation);
    };
  }, []);

  return plugins;
}
