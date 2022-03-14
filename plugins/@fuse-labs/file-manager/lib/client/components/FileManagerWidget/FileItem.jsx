import { FileIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useMemo } from "react";
import { List } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider";

export default function FileItem({
  item,
  selected,
  selectable = true,
  onSelect,
  ...props
}) {

  const { focusItemPath } = useFileManagerContext()
  const isFocused = useMemo(_ => item.path == focusItemPath, [item, focusItemPath])

  return <List.Item {...props} className={classNames(
    'px-0.5 font-semibold rounded-md transition-colors duration-150',
    {
      'cursor-pointer': selectable,
      'hover:bg-white hover:bg-opacity-5': !selected,
      'bg-blue-700 text-gray-50': selected,
      'opacity-50': item.name[0] == '.',
      'ring-2 ring-inset ring-blue-600': isFocused && !selected,
      'ring-2 ring-inset ring-white': isFocused && selected
    }
  )} onClick={_ => onSelect(item)}>
    <FileIcon className="pointer-events-none text-gray-300" />
    <span className="pointer-events-none">{item.name}</span>
  </List.Item>
}