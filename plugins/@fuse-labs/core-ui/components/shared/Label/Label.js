import * as LabelPrimitive from '@radix-ui/react-label'
import classNames from 'classnames'

export default function Label({
  className,
  ...props
}) {
  return <LabelPrimitive.Root className={classNames(
    'font-semibold',
    'text-xs',
    'select-none cursor-default',
    'text-gray-800 dark:text-gray-300',
    className
  )} {...props} />
}