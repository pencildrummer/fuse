import * as SliderPrimitive from '@radix-ui/react-slider'
import classNames from 'classnames'

export default function Slider({
  className,
  ...props
}) {
  return (
    <SliderPrimitive.Root {...props} className={classNames(
      'relative flex items-center',
      'disabled:select-none disabled:touch-none',
      'disabled:opacity-30 radix-disabled:opacity-30',
      className
      )}>
      <SliderPrimitive.Track className='relative w-full h-[4px] rounded-md bg-gray-500 dark:bg-gray-700'>
        <SliderPrimitive.Range className='absolute bg-gray-100 dark:bg-gray-400 rounded-full h-full'/>
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className='block w-4 h-4 rounded-full shadow-sm bg-gray-50 dark:bg-gray-300'/>
    </SliderPrimitive.Root>
  )
}