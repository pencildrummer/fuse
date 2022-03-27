import React, { useMemo } from 'react'
import { DownloadIcon, Share2Icon, TrashIcon } from "@radix-ui/react-icons";
import { ContextMenu } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider";

export default function FileManagerWidgetContextMenu({
  onAction,
  ...props
}) {

  // TODO - Move handling of focus item in list, instead of here
  const { focusItemPath, setFocusItemPath } = useFileManagerContext()

  function handlePointerDown(e) {
    e.preventDefault()
    e.stopPropagation()
    let itemPath = e.target.dataset?.path
    if (!itemPath)
      return console.warn('Unable to get path for context clicked item')
    // Set the focused item
    setFocusItemPath(itemPath)

  }

  function handlePointerDownOutside(e) {
    setFocusItemPath()
  }

  // Default actions
  
  function handleSave() {
    console.log('Handle save', focusItemPath)
    onAction?.('save', { path: focusItemPath })
  }

  function handleDelete() {
    console.log('Handle delete', focusItemPath)
    onAction?.('delete', { path: focusItemPath })
  }

  // TODO - Same principle as other calls, move somehwere more scoped, to be added as a plugin feature
  function handlePrintGCode() {
    onAction?.('print', { path: focusItemPath })
  } 

  const defaultItems = [
    {
      label: 'Save',
      icon: DownloadIcon,
      action: handleSave
    },
    {
      label: 'Delete',
      icon: TrashIcon,
      detail: '⌫',
      action: handleDelete
    },
    {
      label: 'Share',
      icon: Share2Icon,
      items: [
        {
          label: 'Copy'
        },
        {
          label: 'Move'
        }
      ]
    },
  ]

  let items = useMemo(_ => {

    let items = [...defaultItems]

    let actions = []
    // TODO - Make it dynamic ?
    if (focusItemPath?.split('.').pop() == 'gcode') {
      actions.push({
        label: 'Print',
        action: handlePrintGCode
      })
    }

    if (actions.length) {
      items = items.concat('-', actions)
    }

    return items
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusItemPath])

  return (
    <ContextMenu modal={false} items={items} onPointerDown={handlePointerDown}
      onPointerDownOutside={handlePointerDownOutside} >
      {props.children}
    </ContextMenu>
  )
}