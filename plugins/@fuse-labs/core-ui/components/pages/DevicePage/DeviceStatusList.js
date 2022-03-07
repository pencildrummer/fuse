import { useMemo } from "react";
import { useDeviceStatusListContext } from "./DeviceStatusListProvider";
import { CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import classNames from "classnames";

export default function DeviceStatusList() {
  const { statusList } = useDeviceStatusListContext()

  if (!statusList.length)
    return null

  return (
    <div className="flex flex-1">
      <DeviceStatusItem status={statusList[0]}/>
    </div>
  )
}

function DeviceStatusItem({
  status,
  ...props
}) {

  let Icon = useMemo(_ => {
    if (status.icon)
      return status.icon
    switch(status.type) {
      case 'error':   return CrossCircledIcon
      case 'warning': return ExclamationTriangleIcon
      default:        return InfoCircledIcon
    }
  }, [status])

  return (
    <div className="flex-1 flex flex-row space-x-1.5 items-center">
      <Icon className={classNames(
        'w-3 h-3',
        {
          'text-red-300': status.type == 'error',
          'text-orange-400': status.type == 'warning',
          'text-gray-300': status.type == 'normal'
        }
      )}/>
      <span className={classNames(
        {
          'text-red-400': status.type == 'error',
          'text-orange-200': status.type == 'warning',
          'text-gray-300': status.type == 'normal'
        }
      )}>
        {status.message}
      </span>
    </div>
  )
}