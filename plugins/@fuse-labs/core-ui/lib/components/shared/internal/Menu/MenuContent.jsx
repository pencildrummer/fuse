import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import classNames from 'classnames'
import React from 'react'

const MenuContent = React.forwardRef(({
  items,
  ...props
}, ref) => {
  return (
    <div ref={ref} {...props} className={classNames(
      'text-gray-300 bg-gray-700',
      'rounded-lg',
      'shadow-md',
      'min-w-[180px]',
      'p-1',
      props.className
    )}>
      {props.children}
    </div>
  )
})
MenuContent.displayName = "MenuContent"
export default MenuContent