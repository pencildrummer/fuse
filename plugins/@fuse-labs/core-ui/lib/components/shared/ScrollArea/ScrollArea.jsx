import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import classNames from 'classnames'
import React from 'react'

const ScrollArea = React.forwardRef(({
  type = 'scroll',
  onScroll,
  children,
  ...props
}, ref) => {
  return (
    <ScrollAreaPrimitive.Root ref={ref} type={type} {...props} className={classNames(
      'overflow-hidden',
      'flex',
      props.className
    )}>
      <ScrollAreaPrimitive.Viewport className="flex-1" onScroll={onScroll}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical"
        className="flex select-none touch-none px-0.5 py-1 radix-orientation-vertical:w-[11px]">
        <ScrollAreaPrimitive.ScrollAreaThumb className="flex-1 dark:bg-black dark:bg-opacity-50 hover:dark:bg-opacity-75 dark:shadow-gray-700 shadow-sm rounded-full relative" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = "ScrollArea"
export default ScrollArea