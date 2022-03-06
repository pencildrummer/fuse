import { CardStackIcon, ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { List } from "../../../core-ui";
import { useFileManagerContext } from "../FileManagerProvider";
import DirectoryListing from "./DirectoryListing";

export default function DirectoryItem({
  dirname,
  item,
  ...props
}) {

  const [isOpen, setIsOpen] = useState(false)

  function handleClick() { setIsOpen(o => !o) }

  const { focusItemPath } = useFileManagerContext()

  const isFocused = useMemo(_ => item.path == focusItemPath, [focusItemPath, item])

  return (
    <>
      <List.Item {...props} className={classNames(
          'px-0.5 font-bold rounded-md',
          'hover:bg-white hover:bg-opacity-5 transition-colors duration-150 cursor-pointer',
          {
            'opacity-50': item.name[0] == '.',
            'ring-2 ring-inset ring-blue-600': isFocused,
          }
        )}
        onClick={handleClick}>
        {isOpen ? <ChevronDownIcon className="text-gray-200" />
          : <ChevronRightIcon className="text-gray-200" />}
        <span className="select-none">{item.name}</span>
      </List.Item>

      {isOpen && (
        <div className="pl-4">
          <DirectoryListing path={item.path} />
        </div>
      )}
    </>
  )
}