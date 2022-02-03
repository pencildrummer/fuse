import * as SeparatorPrimitive from '@radix-ui/react-separator'
import classNames from 'classnames'

export default function Separator({
  className,
  ...props
}) {
  return <SeparatorPrimitive.Root className={classNames(
    'bg-gray-600',
    {
      'h-px min-w-full self-stretch': props.orientation == 'horizontal' || !props.orientation,
      'min-h-full w-px self-stretch': props.orientation == 'vertical',
    },
    className
  )} {...props} />
}