import React, { useMemo } from "react";
import get from "lodash-es/get";
import type { ClientDevice, ClientPlugin } from "@fuse-labs/core-client";

// Should be move in core-client
export default function useDevicePluginComponents(
  device: ClientDevice,
  plugin: ClientPlugin,
  keyPath: string
): React.ComponentType {
  // Can be moved into DeviceManager intialization? Or leave as a hook to be used when needed instead of loading every component at init
  return useMemo(() => {
    let devicePlugin = device?.plugins?.find((p) => p.name === plugin.name);
    if (!devicePlugin) return null;
    if (typeof devicePlugin.deviceComponents === "function") {
      let components = devicePlugin.deviceComponents(device);
      return get(components, keyPath, false);
    }
    return null;
  }, [device, plugin, keyPath]);
}
