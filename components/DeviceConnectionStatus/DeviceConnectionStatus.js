import Tooltip from "plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip";
import { Link1Icon, LinkBreak1Icon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider";

export default function DeviceConnectionStatus() {

  const { device } = useDeviceContext()

  const content = useMemo(_ => {
    if (device.connected) {
      return (<span className="font-normal text-green-500">Connected on /serialPort</span>)
    } else {
      return (<span className="font-normal text-red-300">Unable to open serial port</span>)
    }
  }, [device.connected])

  return (
    <Tooltip content={content}
      size="sm"
      side="left" sideOffset={18} alignOffset={0}>
      {device.connected
        ? <Link1Icon className="text-lime-600"/>
        : <LinkBreak1Icon className="text-red-600"/>
      }
    </Tooltip>
  )
}