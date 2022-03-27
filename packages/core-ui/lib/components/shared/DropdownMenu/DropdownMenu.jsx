import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React from 'react'
import MenuContent from '../internal/Menu/MenuContent'
import MenuItem from '../internal/Menu/MenuItem'
import Separator from '../Separator/Separator'

const DropdownMenu = ({
  items,
  asSubmenu = false,
  ...props
}) => {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      <DropdownMenuPrimitive.Trigger asChild>
        {props.children}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuContent>
        {items?.map((item, i) => {
          if (typeof item == 'object') {
            if (item.items) {
              return <DropdownMenuItem item={item} asSubmenu items={item.items} key={`menu-item-${i}`}/>
            } else {
              return <DropdownMenuItem
                item={item}
                key={`menu-item-${i}`}
                disabled={!item.action}
                onSelect={_ => item.action?.() } />
            }
          } else if (item === '-') {
            return <DropdownMenuSeparator key={`menu-item-${i}`} />
          } else {
            console.warn('Unsupported item in DropdownMenu', item)
            return null
          }
        })}
      </DropdownMenuContent>
    </DropdownMenuPrimitive.Root>
  )
}

function DropdownMenuContent(props) {
  return (
    <DropdownMenuPrimitive.Content sideOffset={3} {...props} asChild>
      <MenuContent>
        {props.children}
      </MenuContent>
    </DropdownMenuPrimitive.Content>
  )
}

function DropdownMenuItem(props) {
  return (
    <DropdownMenuPrimitive.Item {...props} asChild>
      <MenuItem />
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuSeparator(props) {
  return (
    <DropdownMenuPrimitive.Separator asChild>
      <Separator className="my-1" />
    </DropdownMenuPrimitive.Separator>
  )
}

DropdownMenu.Root = DropdownMenuPrimitive.Root
DropdownMenu.Trigger = DropdownMenuPrimitive.Trigger
DropdownMenu.Content = DropdownMenuContent
DropdownMenu.Item = DropdownMenuItem
DropdownMenu.Separator = DropdownMenuSeparator
export default DropdownMenu