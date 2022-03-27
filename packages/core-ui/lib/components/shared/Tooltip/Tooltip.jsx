import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classNames from 'classnames'
import { useEffect, useMemo } from 'react'

export default function Tooltip({
  size,
  showArrow = false,
  delayDuration,
  content,
  ...props
}) {
  
  const preferredDelayDuration = useMemo(_ => {
    if (size == 'hint') {
      return 750
    } else {
      return 150
    }
  }, [size])

  const sizeClassNames = useMemo(_ => {
    switch(size) {
      case 'hint':return 'text-xxs font-normal rounded-sm p-1 border border-gray-500'
      case 'sm':  return 'text-xxs font-medium rounded-md px-1.5 py-1'
      default:    return 'text-xs rounded-md p-2'
    }
  }, [size])

  const defaultProps = useMemo(_ => {
    switch (size) {
      case 'hint':
        return {
          side: "bottom",
          sideOffset: 3,
          align: "start",
          alignOffset: 15
        }
        break
    }
  }, [size])

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration || preferredDelayDuration}>
      <TooltipPrimitive.Trigger asChild>
        {props.children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content {...defaultProps} {...props}
        className={classNames(
          'leading-none',
          'bg-gray-700 text-gray-100 font-bold shadow-sm',
          sizeClassNames
        )}>
        {showArrow && <TooltipPrimitive.Arrow className='fill-gray-700' />}
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}