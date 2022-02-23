import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
// TODO - Should not be imported here, it's a dependency plugin,
// the terminal obj on DeviceProvider should be added by the plugin itself
import { Terminal } from "plugins/@fuse-labs/marlin-terminal/lib/client/terminal.ts"
import { socket } from "lib/client/socket"

export const DeviceContext = React.createContext()

function test(ns) {
  console.log('INIT useRef with', ns)
  return ns
}

export default function DeviceProvider({
  device,
  ...props
}) {

  // TODO - Move, see note on the top of this file
  const [terminal, setTerminal] = useState()

  // Create socket namespaced for device
  const deviceNamespace = `device:${device.id}`
  
  const deviceSocket = useRef()
  if (!deviceSocket.current) {
    console.log('Creating device socket')
    deviceSocket.current = socket(deviceNamespace)
  }

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
    socket: deviceSocket.current,
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