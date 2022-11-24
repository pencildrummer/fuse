import { Device } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientDeviceManager from "../managers/ClientDeviceManager/ClientDeviceManager";

export default function useProviderDevices(data: Device.DataType[]) {
  const [devices, setDevices] = useState(ClientDeviceManager.devices);

  useEffect(() => {
    if (!data) return;
    ClientDeviceManager.init(data);
    setDevices(ClientDeviceManager.devices);
  }, [data]);

  useEffect(() => {
    const updateState = (_) => setDevices(ClientDeviceManager.devices);
    ClientDeviceManager.addEventListener("updatedDevices", updateState);
    return () => {
      ClientDeviceManager.removeEventListener("updatedDevices", updateState);
    };
  }, []);

  // useEffect(_ => {
  // 	// Add socket listener for newly created device
  // 	coreSocket.on('devices:added', addDevice)
  //   // Add socket listener for updated device
  //   coreSocket.on('devices:updated', updateDevice)
  //   // Add socket listener for removed device
  //   coreSocket.on('devices:removed', removeDevice)
  //   return _ => {
  //     coreSocket.off('devices:added', addDevice)
  //     coreSocket.off('devices:updated', updateDevice)
  //     coreSocket.off('devices:removed', removeDevice)
  //   }
  // }, [])

  return devices;
}
