import * as SeparatorPrimitive from '@radix-ui/react-separator'
import classNames from 'classnames'
import React from 'react'

const Separator = React.forwardRef(({
  ...props
}, ref) => {
  return <SeparatorPrimitive.Root ref={ref} {...props} asChild>
    <div className={classNames(
      'flex-none',
      'border-gray-500 dark:border-gray-600',
      {
        'my-2 border-b': props.orientation == 'horizontal' || !props.orientation,
        'h-px min-w-full self-stretch': props.orientation == 'horizontal' || !props.orientation,
        'mx-2 border-r': props.orientation == 'vertical',
        'min-h-full w-px self-stretch': props.orientation == 'vertical',
      },
      props.className
    )} />
  </SeparatorPrimitive.Root>
})
export default Separator