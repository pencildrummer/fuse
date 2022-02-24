import { useMemo } from "react";
import useDevice from "./useDevice";

export default function useDevicePlugin(deviceId, pluginNameOrURL) {
  let device = useDevice(deviceId)
  return useMemo(_ => device?.plugins?.find(plugin => plugin.fuse.url == pluginNameOrURL || plugin.name === pluginNameOrURL), [device, pluginNameOrURL])
}