import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classNames from 'classnames'
import { useMemo } from 'react'

export default function Tooltip({
  size,
  showArrow = false,
  delayDuration = 150,
  content,
  ...props
}) {
  
  const sizeClassNames = useMemo(_ => {
    switch(size) {
      case 'sm':  return 'text-xxs font-medium rounded-md px-1.5 py-1'
      default:    return 'text-xs rounded-md p-2'
    }
  }, [size])

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>
        {props.children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content {...props}
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