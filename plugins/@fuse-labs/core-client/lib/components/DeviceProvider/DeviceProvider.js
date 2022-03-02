import React from "react"
import { DeviceContext } from "../../hooks/useDeviceContext"

export default function DeviceProvider({
  device,
  ...props
}) {

  return <DeviceContext.Provider value={{
    device,
  }}>
    {props.children}
  </DeviceContext.Provider>
}

