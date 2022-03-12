import * as PopoverPrimitive from '@radix-ui/react-popover'
import classNames from 'classnames'

const Popover = PopoverPrimitive.Root

Popover.Trigger = PopoverPrimitive.Trigger

function PopoverContent({
  className,
  ...props
}) {
  return (
    <PopoverPrimitive.Content 
      sideOffset={3}
      {...props}
      className={classNames(
      'rounded-lg text-gray-300 bg-gray-700',
      'shadow-md',
      'min-w-[180px]',
      'p-1',
      className,
    )}/>
  )
}
Popover.Content = PopoverContent

export default Popover
