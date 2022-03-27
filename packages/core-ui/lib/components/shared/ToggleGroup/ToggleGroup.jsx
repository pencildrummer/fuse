import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import classNames from 'classnames'

const ToggleGroup = ({
  type = 'single',
  ...props
}) => {
  return <ToggleGroupPrimitive.Root type={type} {...props} className={classNames(
    'flex flex-row justify-evenly',
    'dark:bg-gray-800 dark:bg-opacity-60 dark:text-gray-100',
    'rounded-md overflow-hidden',
    'text-xs font-mono',
    props.className
  )} />
}

const Item = (props) => {
  return <ToggleGroupPrimitive.Item {...props} className={classNames(
    'p-1.5',
    'flex-initial',
    'w-full text-center',
    'hover:bg-white hover:bg-opacity-5 transition-colors duration-150',
    'radix-state-on:bg-blue-700',
    props.className
  )} />
}

ToggleGroup.Item = Item

export default ToggleGroup