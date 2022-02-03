import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import React from 'react'

const ScrollArea = React.forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <ScrollAreaPrimitive.Root ref={ref} {...props}>
      <ScrollAreaPrimitive.Viewport className="w-full h-full">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical"
        className="flex select-none touch-none px-0.5 py-1 radix-orientation-vertical:w-[11px]">
        <ScrollAreaPrimitive.ScrollAreaThumb className="flex-1 dark:bg-black dark:bg-opacity-50 hover:dark:bg-opacity-75 dark:shadow-gray-700 shadow-sm rounded-full relative" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  )
})

export default ScrollArea