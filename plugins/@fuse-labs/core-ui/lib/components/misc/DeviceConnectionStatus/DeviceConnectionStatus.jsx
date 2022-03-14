import Tooltip from '../../shared/Tooltip/Tooltip'
import Loader from '../../shared/Loader/Loader'
import { Link1Icon, LinkBreak1Icon, LinkNone1Icon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { coreSocket } from "@fuse-labs/core-client";

const ConnectionStatus = Object.freeze({
  Loading: 0,
  PortNotFound: 1,
  DifferentDevice: 2,
  Connected: 10
})

export default function DeviceConnectionStatus({
  device
}) {

  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.Loading)

  useEffect(_ => {
    coreSocket.emit('devices:connection:check', device.id, (port) => {
      if (port) {
        if (
          port.serialNumber == device.serialNumber &&
          port.vendorId == device.vendorId && 
          port.productId == device.productId
        ) {
          setConnectionStatus(ConnectionStatus.Connected)
        } else {
          setConnectionStatus(ConnectionStatus.DifferentDevice)
        }
      } else {
        setConnectionStatus(ConnectionStatus.PortNotFound)
      }
    })
  }, [device])

  const tooltipContent = useMemo(_ => {
    switch (connectionStatus) {
      case ConnectionStatus.Loading:
        return <span>Checking connection...</span>
      case ConnectionStatus.PortNotFound:
        return <span className="text-red-300">Port {device.port} not found</span>
      case ConnectionStatus.DifferentDevice:
        return <span className="text-yellow-600">A different device is connected to port {device.port}</span>
      case ConnectionStatus.Connected:
        return (<span className="text-lime-500">Device connected on {device.port}</span>)
    }
  }, [connectionStatus, device.port])

  return (
    <Tooltip content={tooltipContent}
      size="sm"
      className="font-normal"
      side="left" sideOffset={18} alignOffset={0}>
        <div>
          {connectionStatus == ConnectionStatus.Loading && <Loader />}
          {connectionStatus == ConnectionStatus.PortNotFound && <LinkBreak1Icon className="text-red-600"/>}
          {connectionStatus == ConnectionStatus.DifferentDevice && <LinkNone1Icon className="text-yellow-600"/>}
          {connectionStatus == ConnectionStatus.Connected && <Link1Icon className="text-lime-600"/>}
        </div>
    </Tooltip>
  )
}