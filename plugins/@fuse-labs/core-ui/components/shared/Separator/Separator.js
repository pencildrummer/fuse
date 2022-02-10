import * as SeparatorPrimitive from '@radix-ui/react-separator'
import classNames from 'classnames'
import React from 'react'

const Separator = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return <SeparatorPrimitive.Root ref={ref} {...props} >
    <div className={classNames(
      'border-b dark:border-gray-700',
      'my-2',
      {
        'h-px min-w-full self-stretch': props.orientation == 'horizontal' || !props.orientation,
        'min-h-full w-px self-stretch': props.orientation == 'vertical',
      },
      className
    )} />
  </SeparatorPrimitive.Root>
})
export default Separator