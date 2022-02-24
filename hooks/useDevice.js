import { useAppContext } from "components/AppProvider/AppProvider"
import { useMemo } from "react"

/**
 * Returns the device with the same id found in the AppContext.
 * Should not be used inside DeviceProvider, use useDeviceContext() instead.
 * @param {string} deviceId 
 * @returns Device
 */
export default function useDevice(deviceId) {
  const { devices } = useAppContext()
  return useMemo(_ => devices.find(device => device.id == deviceId), [devices])
}