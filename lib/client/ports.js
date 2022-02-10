import socket from "lib/client/socket"
import { useEffect, useState } from "react"

export function usePorts() {
  const [ports, setPorts] = useState([])

  useEffect(_ => {
    // Make socket request to list serial ports
    socket.emit('core.serial.list', null, data => {
      setPorts(data)
    })
  }, [])

  return ports
}