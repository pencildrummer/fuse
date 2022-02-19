import { Terminal } from "plugins/@fuse-labs/marlin-terminal/lib/client/terminal.ts"
import React, { useContext, useEffect, useRef, useState } from "react"

export const DeviceContext = React.createContext()

export default function DeviceProvider({
  device,
  ...props
}) {

  const [terminal, setTerminal] = useState()

  useEffect(_ => {
    if (!device)
      return console.warn('Unable to init terminal, missing device')

    // Init terminal for device
    let terminal = new Terminal(device, { autoConnect: false })
    // Save in state the initialized terminal
    console.log(`Terminal for device "${device.id}" initialized`)
    setTerminal(terminal)
  }, [device])

  return <DeviceContext.Provider value={{
    device,
    terminal,
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