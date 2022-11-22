import useAppContext from "./useAppContext";
import { useMemo } from "react";

/**
 * Returns the device with the same id found in the AppContext.
 * Should not be used inside DeviceProvider, use useDeviceContext() instead.
 * @param {string} deviceId
 * @returns Device
 */
export default function useDevice(deviceId: string) {
  const { devices } = useAppContext();
  return useMemo(
    () => devices.find((device) => device.id == deviceId),
    [deviceId, devices]
  );
}
