import { useEffect, useState } from "react";
import ClientDeviceManager from "../managers/ClientDeviceManager/ClientDeviceManager";

export default function useProviderDevices(data) {
  if (!ClientDeviceManager.shared.initialized) {
    ClientDeviceManager.shared.init(data);
  }

  const [devices, setDevices] = useState(ClientDeviceManager.shared.devices);

  useEffect((_) => {
    const updateState = (_) => setDevices(ClientDeviceManager.shared.devices);
    ClientDeviceManager.shared.addEventListener("updatedDevices", updateState);
    return (_) => {
      ClientDeviceManager.shared.removeEventListener(
        "updatedDevices",
        updateState
      );
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
