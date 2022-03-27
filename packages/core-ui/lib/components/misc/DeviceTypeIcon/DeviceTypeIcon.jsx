import { ClientDeviceType } from '@fuse-labs/core-client'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { CNCIcon, FDMPrinterIcon, LaserIcon, MSLAPrinterIcon } from '../../icons'
import { useMemo } from 'react'

export default function DeviceTypeIcon({
  device,
  ...props
}) {
  const IconComponent = useMemo(_ => {
    switch (device.profile.type) {
      case ClientDeviceType.FDMPrinter:
        return FDMPrinterIcon
      case ClientDeviceType.MSLAPrinter:
        return MSLAPrinterIcon
      case ClientDeviceType.CNC:
        return CNCIcon
      case ClientDeviceType.Laser:
        return LaserIcon
      default:
        return QuestionMarkCircledIcon
    }
  }, [device?.profile.type])

  return <IconComponent {...props} />
}