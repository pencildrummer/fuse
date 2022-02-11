import { List } from "plugins/@fuse-labs/core-ui"
import CompactListItem from "./CompactListItem"

export default function CompactList({
  items,
  itemComponent: ItemComponent = CompactListItem,
  ...props
}) {
  return <List {...props} className="text-xs" size="compact">
    {items?.map((item, i) => <ItemComponent key={`item-${i}`} item={item} />)}
    {props.children}
  </List>
}
CompactList.Item = CompactListItem