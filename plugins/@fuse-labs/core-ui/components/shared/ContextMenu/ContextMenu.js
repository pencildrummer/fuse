import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import React from 'react'
import Separator from '../Separator/Separator'

const ContextMenuItem = React.forwardRef(({
  item,
  children,
  ...props
}, ref) => {
  return <div ref={ref}
    className={classNames(
      'relative',
      'rounded-md',
      'text-xs leading-none font-medium',
      'flex flex-row items-center',
      'pl-6 pr-1 h-6',
      'focus:bg-blue-700 focus:outline-none',
      'radix-state-open:bg-blue-900',
      'radix-disabled:opacity-60 disabled:opacity-60',
      {
        'cursor-default': !item.action && !item.items,
        'cursor-pointer': item.action || item.items
      }
    )} {...props}>
    {item.icon && <div className='absolute left-0 w-6 inline-flex items-center justify-center'>
      <item.icon className="opacity-60"/>
    </div>}
    {item.label}
    {item.detail && (
    <div className='ml-auto text-gray-400 text-xs'>
      {item.detail}
    </div>
    )}
    {item.items && (
      <div className='ml-auto'>
        <ChevronRightIcon />
      </div>
    )}
    {children}
  </div>
})

export default function ContextMenu({
  items,
  asSubmenu = false,
  onPointerDown,
  ...props,
}) {

  let TriggerItem = asSubmenu ? ContextMenuPrimitive.TriggerItem : ContextMenuPrimitive.Trigger

  function handlePointerDown(e) {
    onPointerDown?.(e)
  }

  function handlePointerDownOutside(e) {
    onPointerDown?.(e)
  }

  return (
    <ContextMenuPrimitive.Root>
      <TriggerItem asChild={asSubmenu} onPointerDown={handlePointerDown}>
        {props.children}
      </TriggerItem>

      <ContextMenuPrimitive.Content className={classNames(
        'rounded-lg text-gray-300 bg-gray-700',
        'shadow-md',
        'min-w-[180px]',
        'p-1',
      )} onPointerDownOutside={handlePointerDownOutside}>
        {items?.map((item, i) => {
          if (typeof item == 'object') {
            if (item.items) {
              return <ContextMenu asSubmenu items={item.items} key={`menu-item-${i}`}>
                <ContextMenuItem item={item} />
              </ContextMenu>
            } else {
              return <ContextMenuPrimitive.Item asChild
                key={`menu-item-${i}`}
                disabled={!item.action}
                onSelect={_ => item.action?.() }>
                <ContextMenuItem item={item} />
              </ContextMenuPrimitive.Item>
            }
          } else if (item === '-') {
            return <ContextMenuPrimitive.Separator asChild key={`menu-item-${i}`}>
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