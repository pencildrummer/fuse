import { coreSocket } from "@fuse-labs/core-client"
import { useEffect, useState } from "react"

export default function useSerialPorts() {
  const [ports, setPorts] = useState([])

  useEffect(_ => {
    // Make socket request to list serial ports
    coreSocket.emit('serial:list', data => {
      console.log('Called', data)
      setPorts(data)
    })
  }, [])

  return ports
}