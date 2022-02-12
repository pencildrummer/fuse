import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import { List } from "plugins/@fuse-labs/core-ui"
import React, { useEffect, useMemo, useState } from "react"

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
          data-item-key={props['data-item-key']}
          items={items}
          itemComponent={itemComponent}/>
      </div>
    )}
  </>
}

function CompactListRoot({
  items,
  itemComponent: ItemComponent = CompactListItem,
  onSelect,
  itemDisplayTransform,
  groupDisplayTransform,
  isGroupTransform,
  ...props
}) {

  const { 
    selectedItemKey,
    setSelectedItemKey,
    maxDepth
  } = React.useContext(ListSelectionContext)

  const contents = (items) => {
    if (!items) return null

    if (typeof items == 'object') {
      // Group by keys listing only keys
      return Object.keys(items).map(key => {

        let value = items[key]
        let dataItemKey = [props['data-item-key'], key].filter(Boolean).join('.')
        let currentDepth = dataItemKey.split('.').length - 1

        let renderGroup = !isPrimitive(value) && currentDepth < maxDepth
        if (typeof isGroupTransform === 'function') {
          renderGroup = isGroupTransform(key, value, dataItemKey)
        }

        if (renderGroup) {
          return (
            <GroupCompactListItem 
              key={`group-${key}`}
              data-item-key={dataItemKey}
              items={items[key]} 
              itemComponent={ItemComponent} 
              onSelect={onSelect}>
              {groupDisplayTransform ? groupDisplayTransform(key) : key}
            </GroupCompactListItem>
          )
        } else {
          return <ItemComponent
            key={`item-${key}`}
            data-item-key={dataItemKey}
            selected={selectedItemKey === dataItemKey}
            item={itemDisplayTransform ? itemDisplayTransform(value) : value} 
            onClick={_ => setSelectedItemKey(dataItemKey)}/>
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
CompactList.Item = CompactListItem

const ListSelectionContext = React.createContext()

export default function CompactList(props) {

  const [selectedItemKey, setSelectedItemKey] = useState(props.defaultValue)

  useEffect(_ => handleSelect(selectedItemKey), [selectedItemKey])

  function handleSelect(item) {
    props.onSelect?.(item)
  }

  return <ListSelectionContext.Provider value={{
    selectedItemKey,
    setSelectedItemKey,

    maxDepth: props.maxDepth
  }}>
    <CompactListRoot {...props} className="text-xs" size="compact"/>
  </ListSelectionContext.Provider>
}