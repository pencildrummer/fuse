import React from "react";
import { DeviceContext } from "../../hooks/useDeviceContext";
import { ClientDevice } from "../../models";

type Props = React.PropsWithChildren<{
  device: ClientDevice;
}>;

export default function DeviceProvider({ device, ...props }: Props) {
  return (
    <DeviceContext.Provider
      value={{
        device,
      }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
}
