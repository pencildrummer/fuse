import { ChevronRightIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import React from "react"

const MenuItem = React.forwardRef(({
  item,
  children,
  ...props
}, ref) => {
  return <div ref={ref}
    className={classNames(
      'relative',
      'rounded-md',
      'text-xs leading-none font-medium',
      'flex flex-row items-center',
      'pl-6 pr-1 h-6',
      'focus:bg-blue-700 focus:outline-none',
      'radix-state-open:bg-blue-900',
      'radix-disabled:opacity-60 disabled:opacity-60',
      {
        'cursor-default': !item.action && !item.items,
        'cursor-pointer': item.action || item.items
      }
    )} {...props}>
    {item.icon && <div className='absolute left-0 w-6 inline-flex items-center justify-center'>
      <item.icon className="opacity-60"/>
    </div>}
    {item.label}
    {item.detail && (
    <div className='ml-auto text-gray-400 text-xs'>
      {item.detail}
    </div>
    )}
    {item.items && (
      <div className='ml-auto'>
        <ChevronRightIcon />
      </div>
    )}
    {children}
  </div>
})
MenuItem.displayName = "MenuItem"
export default MenuItem