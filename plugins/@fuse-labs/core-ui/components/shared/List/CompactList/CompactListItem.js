import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import CompactList from "./CompactList";
import List from "../List";
import { useMemo, useState } from "react";

export default function CompactListItem({
  selected,
  selectable = true,
  expandable = false,
  items,
  itemComponent,
  className,
  onSelect,
  ...props
}) {

  const [expanded, setExpanded] = useState(false)
  function handleClick() {
    if (expandable) {
      setExpanded(expanded => !expanded)
    } else if (selectable) {
      onSelect?.()
    }
  }

  return <>
    <List.Item {...props} className={classNames(
      'px-0.5 transition-colors duration-150',
      'select-none',
      'rounded-md',
      {
        'font-semibold': !items,
        'font-bold': items
      },
      {
        'cursor-pointer': props.selectable,
        'hover:bg-white hover:bg-opacity-5': !props.selected,
        'bg-blue-700 text-gray-50': props.selected,
      },
      className
    )} onClick={handleClick}>
      {expandable && (expanded ? <ChevronDownIcon className="text-gray-200" />
        : <ChevronRightIcon className="text-gray-200" />)}

      {props.children}
    </List.Item>

    {items?.length && expanded && (
      <div className="pl-4">
        <CompactList size="compact" divide={false} items={items} itemComponent={itemComponent || CompactListItem} />
      </div>
    )}
  </>
}