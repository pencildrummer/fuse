import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

export default function Checkbox({
  ...props
}) {
  return <CheckboxPrimitive.Root className={classNames(
    'h-[24px] w-[24px]',
    'rounded-md',
    'bg-gray-900 border border-gray-600 text-gray-300',
    'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
    'disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800',
  )}>
    <CheckboxPrimitive.Indicator className={classNames(
      'flex items-center justify-center'
    )}>
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
}