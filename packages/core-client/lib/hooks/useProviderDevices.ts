import { Device } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import ClientDeviceManager from "../managers/ClientDeviceManager/ClientDeviceManager";
import { ClientDevice } from "../models/index.js";

export default function useProviderDevices(data: Device.DataType[]) {
  const [devices, setDevices] = useState<ClientDevice[] | null>();

  useEffect(() => {
    if (!data) return;
    ClientDeviceManager.configureWithData(data);
    setDevices(ClientDeviceManager.devices);
  }, [data]);

  useEffect(() => {
    const updateState = () => setDevices(ClientDeviceManager.devices);
    ClientDeviceManager.addEventListener("updatedDevices", updateState);
    return () => {
      ClientDeviceManager.removeEventListener("updatedDevices", updateState);
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
