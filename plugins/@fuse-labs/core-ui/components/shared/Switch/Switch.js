import * as SwitchPrimitive from '@radix-ui/react-switch'
import classNames from 'classnames'

export default function Switch({
  ...props
}) {
  return <SwitchPrimitive.Root className={classNames(
    'w-8 h-4 rounded-full bg-current ring-2 ring-current',
    'transition-colors duration-150',
    'radix-state-unchecked:text-gray-50 dark:radix-state-unchecked:text-gray-700',
    'radix-state-checked:text-green-600',
    'disabled:opacity-30',
  )} {...props}>
    <SwitchPrimitive.Thumb className={classNames(
      'block w-4 h-4 rounded-full shadow-sm bg-gray-50 dark:bg-gray-300',
      'radix-state-checked:ring-1 radix-state-checked:ring-green-700',
      'transition-transform duration-150',
      'radix-state-checked:translate-x-4'
    )}/>
  </SwitchPrimitive.Root>
}