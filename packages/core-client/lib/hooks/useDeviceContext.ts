import React, { useContext } from "react";
import { ClientDevice } from "../models";

export interface DeviceContextInterface<T extends ClientDevice = ClientDevice> {
  device: T;
}

export const DeviceContext = React.createContext<DeviceContextInterface | null>(
  null
);

export default function useDeviceContext<
  T extends ClientDevice = ClientDevice
>() {
  const ctx = useContext(DeviceContext) as DeviceContextInterface<T>;
  if (!ctx)
    throw new Error(
      "useDeviceContext can be used only inside a DeviceProvider"
    );
  return ctx;
}
