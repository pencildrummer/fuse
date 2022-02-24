import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
// TODO - Should not be imported here, it's a dependency plugin,
// the terminal obj on DeviceProvider should be added by the plugin itself
import { Terminal } from "plugins/@fuse-labs/marlin-terminal/lib/client/terminal.ts"

export const DeviceContext = React.createContext()

export default function DeviceProvider({
  device,
  ...props
}) {

  // TODO - Move, see note on the top of this file
  const [terminal, setTerminal] = useState()

  // TODO - MAke someting to dinamically inject properties on device from plugins to be accessed from context
  useEffect(_ => {
    // -- TODO - See top
    if (!device)
      return console.warn('Unable to init terminal, missing device')
    // Init terminal for device
    let terminal = new Terminal(device, { autoConnect: false })
    // Save in state the initialized terminal
    console.log(`Terminal for device "${device.id}" initialized`)
    setTerminal(terminal)
    // --
  }, [device])

  return <DeviceContext.Provider value={{
    device,
    socket: device.socket,
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