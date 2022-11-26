import { useEffect } from "react"
import { useDeviceContext } from '@fuse-labs/core-client'
import { useDeviceStatusListContext } from "./DeviceStatusListProvider"

export default function DevicePageErrorHandler() {

  const { device } = useDeviceContext()
  const { addStatus } = useDeviceStatusListContext()

  useEffect(_ => {

    let errorHandler = err => {
      switch (err.code) {
        default:
          addStatus(err.message, { type: 'error' })
      }
    }

    let statusHandler = status => {
      addStatus(status.message, { type: status.type })
    }

    device.socket.on('error', errorHandler)
    device.socket.on('status:error', statusHandler)
    device.socket.on('status:warning', statusHandler)
    device.socket.on('status:success', statusHandler)
    device.socket.on('status:info', statusHandler)
    return _ => {
      device.socket.off('error', errorHandler)
      device.socket.off('status:error', statusHandler)
      device.socket.off('status:warning', statusHandler)
      device.socket.off('status:success', statusHandler)
      device.socket.off('status:info', statusHandler)
    }
  }, [device])

  return null
}