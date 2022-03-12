import * as ProgressPrimitive from '@radix-ui/react-progress'
import classNames from 'classnames'
import { useMemo } from 'react'

export default function Progress(props) {
  const progress = useMemo(_ => {
    return props.value/props.max*100
  }, [props.value, props.max])

  return (
    <ProgressPrimitive.Root {...props} className={classNames(
      'relative',
      'h-[2px]',
      'w-full',
      'bg-gray-800',
      props.className
    )}>
      <ProgressPrimitive.Indicator className='h-full transition-[width] duration-150 bg-blue-600'
        style={{width: `${progress}%`}}/>
    </ProgressPrimitive.Root>
  )
}