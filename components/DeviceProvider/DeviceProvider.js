import React, { useCallback, useContext, useEffect, useRef, useState } from "react"
// TODO - Should not be imported here, it's a dependency plugin,
// the terminal obj on DeviceProvider should be added by the plugin itself
import { Terminal } from "plugins/@fuse-labs/marlin-terminal/lib/client/terminal.ts"
import { socket } from "lib/client/socket"
import { useAppContext } from "components/AppProvider/AppProvider"
import _ from 'lodash'


export const DeviceContext = React.createContext()

export default function DeviceProvider({
  device,
  ...props
}) {

  // TODO - Move, see note on the top of this file
  const [terminal, setTerminal] = useState()

  const { plugins } = useAppContext()

  // Load active plugins on device
  device.plugins = plugins.filter(p => p.fuse.devices?.includes(device.profile.type))

  // Device socket namespace
  const deviceNamespace = `device:${device.id}`

  // The socket connected directly to the device namespace
  const deviceSocket = useRef()
  if (!deviceSocket.current) {
    console.log('Creating device socket')
    deviceSocket.current = socket(deviceNamespace)
  }

  // Create socket for active plugins
  device.sockets = {}
  device.plugins?.forEach((plugin) => {
    if (!plugin.fuse.hasSocket) return
    let keyPath = plugin.name.split('/').map(key => _.camelCase(key)).join('.')
    let pluginDeviceSocket = socket(deviceNamespace+'/'+plugin.name)
    
    _.set(device.sockets, keyPath, pluginDeviceSocket)
  })

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