import React, { useContext } from "react"

export const DeviceContext = React.createContext()

export default function DeviceProvider(props) {
  return <DeviceContext.Provider value={{
    device: props.device
  }}>
    {props.children}
  </DeviceContext.Provider>
}

export function useDeviceContext() {
  const ctx = useContext(DeviceContext)
  if (!ctx)
    throw new Error('useDeviceContext can be used only inside a DeviceProvider')
  return ctx
}