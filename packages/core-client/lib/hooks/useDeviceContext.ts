import React, { useContext } from "react";

interface DeviceContextInterface {}

export const DeviceContext = React.createContext<DeviceContextInterface | null>(
  null
);

export default function useDeviceContext() {
  const ctx = useContext(DeviceContext);
  if (!ctx)
    throw new Error(
      "useDeviceContext can be used only inside a DeviceProvider"
    );
  return ctx;
}
