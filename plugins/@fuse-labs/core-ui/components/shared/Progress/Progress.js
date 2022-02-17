import * as ProgressPrimitive from '@radix-ui/react-progress'
import classNames from 'classnames'

export default function Progress(props) {
  return (
    <ProgressPrimitive.Root {...props} className={classNames(
      'relative',
      'h-[2px]',
      'w-full',
      //'bg-gray-800',
      props.className
    )}>
      <ProgressPrimitive.Indicator className='h-full transition-[width] duration-150 bg-blue-600'/>
    </ProgressPrimitive.Root>
  )
}