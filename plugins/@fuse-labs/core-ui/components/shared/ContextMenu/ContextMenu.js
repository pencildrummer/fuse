import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import classNames from 'classnames'
import Separator from '../Separator/Separator'

export default function ContextMenu({
  items,
  ...props,
}) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        {props.children}>
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Content className={classNames(
        'rounded-lg text-gray-300 bg-gray-700',
        'shadow-md',
        'min-w-[180px]',
        'p-1',
      )}>
        {items?.map((item, i) => {
          if (typeof item == 'object') {
            return <ContextMenuPrimitive.Item className={classNames(
              'relative',
              'rounded-md',
              'text-xs leading-none font-medium',
              'flex flex-row items-center',
              'pl-6 pr-1 h-6',
              'focus:bg-blue-700 focus:outline-none',
              'radix-disabled:opacity-60 disabled:opacity-60',
              {
                'cursor-default': !item.action,
                'cursor-pointer': item.action
              }
            )} 
            disabled={!item.action}
            onClick={_ => item.action?.() }>
              {item.icon && <div className='absolute left-0 w-6 inline-flex items-center justify-center'>
                <item.icon className="opacity-60"/>
              </div>}
              {item.label}
              <div className='ml-auto text-gray-400 text-xs'>
                {item.detail}
              </div>
            </ContextMenuPrimitive.Item>
          } else if (item === '-') {
            return <ContextMenuPrimitive.Separator asChild>
              <Separator className="my-1" />
            </ContextMenuPrimitive.Separator>
          } else {
            console.warn('Unsupported item in ContextMenu', item)
            return null
          }
        })}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Root>
  )
}