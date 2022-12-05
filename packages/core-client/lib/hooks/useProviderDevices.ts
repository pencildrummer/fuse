import { Device } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientDeviceManager from "../managers/ClientDeviceManager/ClientDeviceManager";

export default function useProviderDevices(data: Device.DataType[]) {
  const [devices, setDevices] = useState(ClientDeviceManager.shared.devices);

  useEffect(() => {
    if (!data) return;
    ClientDeviceManager.shared.init(data);
    setDevices(ClientDeviceManager.shared.devices);
  }, [data]);

  useEffect(() => {
    const updateState = () => setDevices(ClientDeviceManager.shared.devices);
    ClientDeviceManager.shared.addEventListener("updatedDevices", updateState);
    return () => {
      ClientDeviceManager.shared.removeEventListener(
        "updatedDevices",
        updateState
      );
    };
  }, []);

  // useEffect(() => {
  // 	// Add socket listener for newly created device
  // 	coreSocket.on('devices:added', addDevice)
  //   // Add socket listener for updated device
  //   coreSocket.on('devices:updated', updateDevice)
  //   // Add socket listener for removed device
  //   coreSocket.on('devices:removed', removeDevice)
  //   return () => {
  //     coreSocket.off('devices:added', addDevice)
  //     coreSocket.off('devices:updated', updateDevice)
  //     coreSocket.off('devices:removed', removeDevice)
  //   }
  // }, [])

  return devices;
}
