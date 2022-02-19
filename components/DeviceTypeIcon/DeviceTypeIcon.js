import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import DeviceType from 'lib/shared/devices/DeviceType'
import CNCIcon from 'plugins/@fuse-labs/core-ui/components/icons/CNCIcon'
import FDMPrinterIcon from 'plugins/@fuse-labs/core-ui/components/icons/FDMPrinterIcon'
import LaserIcon from 'plugins/@fuse-labs/core-ui/components/icons/LaserIcon'
import MSLAPrinterIcon from 'plugins/@fuse-labs/core-ui/components/icons/MSLAPrinterIcon'
import { useMemo } from 'react'

export default function DeviceTypeIcon({
  device,
  ...props
}) {
  const IconComponent = useMemo(_ => {
    switch (device.profile.type) {
      case DeviceType.FDMPrinter:
        return FDMPrinterIcon
      case DeviceType.MSLAPrinter:
        return MSLAPrinterIcon
      case DeviceType.CNC:
        return CNCIcon
      case DeviceType.Laser:
        return LaserIcon
      default:
        return QuestionMarkCircledIcon
    }
  }, [device?.profile.type])

  return <IconComponent {...props} />
}