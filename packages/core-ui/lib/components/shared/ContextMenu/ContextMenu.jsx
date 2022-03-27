import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import React, { useState } from 'react'
import MenuContent from '../internal/Menu/MenuContent'
import MenuItem from '../internal/Menu/MenuItem'
import Separator from '../Separator/Separator'

export default function ContextMenu({
  items,
  modal,
  asSubmenu = false,
  onPointerDown,
  onPointerDownOutside,
  ...props
}) {

  let TriggerItem = asSubmenu ? ContextMenuPrimitive.TriggerItem : ContextMenuPrimitive.Trigger

  const [open, setOpen] = useState(false)

  function handlePointerDown(e) {
    //if (!open) return
    onPointerDown?.(e)
  }

  function handlePointerDownOutside(e) {
    onPointerDownOutside?.(e)
  }

  return (
    <ContextMenuPrimitive.Root modal={modal} onOpenChange={setOpen}>
      <TriggerItem asChild={asSubmenu} onPointerDown={handlePointerDown}>
        {props.children}
      </TriggerItem>

      <ContextMenuPrimitive.Content onPointerDownOutside={handlePointerDownOutside} asChild>
        <MenuContent>
          {items?.map((item, i) => {
            if (typeof item == 'object') {
              if (item.items) {
                return <ContextMenu asSubmenu items={item.items} key={`menu-item-${i}`}>
                  <MenuItem item={item} />
                </ContextMenu>
              } else {
                return <ContextMenuPrimitive.Item asChild
                  key={`menu-item-${i}`}
                  disabled={!item.action}
                  onSelect={_ => item.action?.() }>
                  <MenuItem item={item} />
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
        </MenuContent>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Root>
  )
}