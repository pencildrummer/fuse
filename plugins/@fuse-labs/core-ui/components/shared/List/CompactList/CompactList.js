import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import { List } from "plugins/@fuse-labs/core-ui"
import React, { useContext, useEffect, useMemo, useState } from "react"

function isPrimitive(val) {
  if (val === null) return true
  return !(typeof val == 'object' || typeof val == 'function')
}

function CompactListItem({
  item,
  selected,
  selectable = true,
  className,
  ...props
}) {

  const content = useMemo(_ => {
    if (props.children) return props.children
    if (typeof item == 'object') {
      return JSON.stringify(item)
    } else if (typeof item == 'function') {
      return item(item)
    } else {
      return item
    }
  }, [item, props.children])

  return (
    <List.Item {...props} className={classNames(
      'px-0.5 transition-colors duration-150',
      'select-none',
      'rounded-md',
      'font-semibold',
      {
        'cursor-pointer': selectable,
        'hover:bg-white hover:bg-opacity-5': !selected,
        'bg-blue-700 text-gray-50': selected,
      },
      className
    )}>
      {content}
    </List.Item>
  )
}

function GroupCompactListItem({
  items,
  itemComponent,
  ...props
}) {

  const [open, setOpen] = useState(false)

  return <>
    <List.Item {...props} className={classNames(
      'px-0.5 transition-colors duration-150',
      'select-none',
      'rounded-md',
      'font-semibold',
      {
        'cursor-pointer': props.selectable,
        'hover:bg-white hover:bg-opacity-5': !props.selected,
        'bg-blue-700 text-gray-50': props.selected,
      },
      props.className
    )} onClick={_ => setOpen(o => !o)}>
      {open ? <ChevronDownIcon className="text-gray-200" />
        : <ChevronRightIcon className="text-gray-200" />}
      {props.children}
    </List.Item>

    {open && (
      <div className="pl-3">
        <CompactListRoot
          data-group-key={props['data-group-key']}
          items={items}
          itemComponent={itemComponent}/>
      </div>
    )}
  </>
}

function CompactListRoot({
  items,
  itemComponent: ItemComponent = CompactListItem,
  itemDisplayTransform,
  groupDisplayTransform,
  isGroupTransform,
  hideEmptyGroups = false,
  ...props
}) {

  const { 
    selectedItemKey,
    handleSelect,
    maxDepth,
    keyTransform,
  } = React.useContext(ListSelectionContext)

  const contents = (items) => {
    if (!items) return null

    if (typeof items == 'object') {
      // Group by keys listing only keys
      return Object.keys(items).map(key => {

        let currentDepth = props['data-group-key']?.split('.').length || 0

        let value = items[key]

        let isGroup = isGroupTransform?.(key, value) || (!isPrimitive(value) && currentDepth < maxDepth)

        let itemKey = keyTransform?.(key, value, isGroup) || key
               
        let dataItemKey = [props['data-group-key'], itemKey].filter(Boolean).join('.')
        
        if (isGroup) {
          if (hideEmptyGroups && !value?.length) {
            return null
          } else {
            return (
              <GroupCompactListItem 
                key={`group-${itemKey}`}
                data-group-key={dataItemKey}
                items={value} 
                itemComponent={ItemComponent} >
                {groupDisplayTransform ? groupDisplayTransform(key, value) : key}
              </GroupCompactListItem>
            )
          }
        } else {
          console.log('Item keys', itemKey, dataItemKey)
          return <ItemComponent
            key={`item-${itemKey}`}
            data-item-key={dataItemKey}
            selected={selectedItemKey === dataItemKey}
            item={itemDisplayTransform ? itemDisplayTransform(value) : value} 
            onClick={_ => handleSelect(dataItemKey, value)}/>
        }
      })
    } else {
      throw new Error(`Unsupport type of items: ${typeof items}`)
    }
  }

  return (
    <List {...props} className="text-xs" size="compact">
      {contents(items)}
      {props.children}
    </List>
  )
}

const ListSelectionContext = React.createContext()

export default function CompactList(props) {

  const [selectedItemKey, setSelectedItemKey] = useState(props.defaultValue)

  function handleSelect(key, value) {
    setSelectedItemKey(key)
    props.onSelect?.(key, value)
  }

  return <ListSelectionContext.Provider value={{
    selectedItemKey,
    setSelectedItemKey,
    handleSelect, // Pass internal select handler that trigger the prop provided one to allow for more control
    
    maxDepth: props.maxDepth,
    keyTransform: props.keyTransform,
  }}>
    <CompactListRoot {...props} className="text-xs" size="compact"/>
  </ListSelectionContext.Provider>
}
CompactList.Item = CompactListItem