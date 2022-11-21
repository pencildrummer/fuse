import { useMemo } from "react";
import useDevice from "./useDevice";

export default function useDevicePlugin(
  deviceId: string,
  pluginNameOrURL: string
) {
  let device = useDevice(deviceId);
  return useMemo(
    () =>
      device?.plugins?.find(
        (plugin) =>
          plugin.url == pluginNameOrURL || plugin.name === pluginNameOrURL
      ),
    [device, pluginNameOrURL]
  );
}
