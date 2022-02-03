import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import classNames from 'classnames'

const ToggleGroup = (props) => {
  return <ToggleGroupPrimitive.Root {...props} className={classNames(
    'flex flex-row justify-evenly',
    'dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-100',
    //'divide-x divide-gray-700',
    //'border border-gray-700',
    'rounded-md overflow-hidden',
    'text-xs font-mono',
  )} />
}

const Item = (props) => {
  return <ToggleGroupPrimitive.Item {...props} className={classNames(
    'p-1.5',
    'w-full text-center',
    'hover:bg-white hover:bg-opacity-5 transition-colors duration-150',
    'radix-state-on:bg-gray-700'
  )} />
}

ToggleGroup.Item = Item

export default ToggleGroup