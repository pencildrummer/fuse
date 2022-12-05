import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import React, { useState } from "react";
import MenuContent from "../internal/Menu/MenuContent";
import MenuItem from "../internal/Menu/MenuItem";
import Separator from "../Separator/Separator";

export default function ContextMenu({
  items,
  modal,
  asSubmenu = false,
  onPointerDown,
  onPointerDownOutside,
  ...props
}) {
  let Root = asSubmenu ? ContextMenuPrimitive.Sub : ContextMenuPrimitive.Root;

  let Content = asSubmenu
    ? ContextMenuPrimitive.SubContent
    : ContextMenuPrimitive.Content;

  let Trigger = asSubmenu
    ? ContextMenuPrimitive.SubTrigger
    : ContextMenuPrimitive.Trigger;

  const [open, setOpen] = useState(false);

  function handlePointerDown(e) {
    //if (!open) return
    onPointerDown?.(e);
  }

  function handlePointerDownOutside(e) {
    onPointerDownOutside?.(e);
  }

  return (
    <Root modal={modal} onOpenChange={setOpen}>
      <Trigger asChild={asSubmenu} onPointerDown={handlePointerDown}>
        {props.children}
      </Trigger>

      <ContextMenuPrimitive.Portal>
        <Content onPointerDownOutside={handlePointerDownOutside} asChild>
          <MenuContent>
            {items?.map((item, i) => {
              if (typeof item == "object") {
                if (item.items) {
                  return (
                    <ContextMenu
                      asSubmenu
                      items={item.items}
                      key={`menu-item-${i}`}
                    >
                      <MenuItem item={item} />
                    </ContextMenu>
                  );
                } else {
                  return (
                    <ContextMenuPrimitive.Item
                      asChild
                      key={`menu-item-${i}`}
                      disabled={!item.action}
                      onSelect={() => item.action?.()}
                    >
                      <MenuItem item={item} />
                    </ContextMenuPrimitive.Item>
                  );
                }
              } else if (item === "-") {
                return (
                  <ContextMenuPrimitive.Separator
                    asChild
                    key={`menu-item-${i}`}
                  >
                    <Separator className="my-1" />
                  </ContextMenuPrimitive.Separator>
                );
              } else {
                console.warn("Unsupported item in ContextMenu", item);
                return null;
              }
            })}
          </MenuContent>
        </Content>
      </ContextMenuPrimitive.Portal>
    </Root>
  );
}
