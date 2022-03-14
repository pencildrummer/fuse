// Use radix primitive to allow custom style instead of using standard FUSE UI Select component
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { CaretDownIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useDeviceContext } from "@fuse-labs/core-client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Separator, DeviceTypeIcon, DeviceConnectionStatus } from '../../../index'

const DevicePickerTrigger = React.forwardRef( ({ device, open, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={classNames(
      'relative',
      'group',
      'cursor-pointer',
      'select-none',
      'flex flex-row space-x-2 items-center',
      'rounded-sm',
      'ring-[3px]',
      {
        'bg-transparent ring-transparent': !open,
        'hover:ring-gray-700 hover:bg-gray-700': !open,
        'bg-gray-700 ring-gray-700': open
      },
      'pl-[3px] ml-[-3px]', // To add left bg space when hovering
      'transition-all duration-300',
    )}>
      <DeviceTypeIcon device={device} />
      <span>
        {device.name}
      </span>
      <span className="text-gray-500">•</span>
      <span className="text-xxs text-gray-500">
        {device.profile.brand} {device.profile.model}
      </span>
      <div className={classNames(
        'absolute right-0',
        'bg-gray-700',
        'pl-1',
        {
          'opacity-0 group-hover:opacity-100 duration-300': !open,
        }
        )}>
        <CaretDownIcon />
      </div>
    </div>
  )
})
DevicePickerTrigger.displayName = "DevicePickerTrigger"

export default function DevicePicker({
  devices
}) {

  const router = useRouter()
  const { device } = useDeviceContext()

  const [open, setOpen] = useState(false)

  const triggerEl = useRef()
  const [width, setWidth] = useState('auto')
  useEffect(_ => {
    // Add pl - ml size tweak and ring size
    setWidth(triggerEl.current.offsetWidth+ 3 + 3)
  }, [open])

  function handleDeviceClick(device) {
    setOpen(false)
    // Push router to index page for requested device
    router.push(`/workspace/devices/${device.id}`)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <DevicePickerTrigger device={device} open={open} ref={triggerEl}/>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content className={classNames(
        'w-full',
        'flex flex-col items-start',
        'bg-gray-300 dark:bg-gray-700',
        'shadow-md shadow-gray-900',
        'p-1',
        'focus:outline-none',
        'rounded-md'
      )} style={{minWidth: width}} sideOffset={6} align="start" alignOffset={-3}>
        {devices?.map(device => {
          return (
            <li key={`device-${device.id}`}
              className={classNames(
                'cursor-pointer select-none',
                'flex flex-row space-x-1 items-center',
                'text-sm font-medium',
                'py-0.5 px-1',
                'w-full',
                'rounded-[4px]',
                'transition-colors duration-75',
                'cursor-default',
                'text-gray-800 dark:text-gray-300',
                'hover:text-gray-50 hover:bg-blue-600',
                'group',
                'flex-nowrap truncate'
              )} onClick={_ => handleDeviceClick(device)}>
              <DeviceTypeIcon device={device} />
              <span>
                {device.name}
              </span>
              <span className="text-gray-500 group-hover:text-gray-300">•</span>
              <span className="text-xxs text-gray-500 group-hover:text-gray-300 truncate flex-1">
                {device.profile.brand} {device.profile.model}
              </span>
              <Separator orientation="vertical" className="!border-gray-500 pl-2"/>
              <div className="pl-1">
                <DeviceConnectionStatus device={device} />
              </div>
            </li>
          )
        })}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  )
}