import socket from "lib/client/socket"
import { useEffect, useState } from "react"

export function usePorts() {
  const [ports, setPorts] = useState([])

  useEffect(_ => {
    // Make socket request to list serial ports
    socket.emit('serial:list', data => {
      console.log('Called', data)
      setPorts(data)
    })
  }, [])

  return ports
}