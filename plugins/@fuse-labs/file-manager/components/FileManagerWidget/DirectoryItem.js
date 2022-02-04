import { CardStackIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { List } from "../../../core-ui";

export default function DirectoryItem({
  directory,
  ...props
}) {
  return <List.Item className="px-0.5 font-bold rounded-md hover:bg-white hover:bg-opacity-5 transition-colors duration-150">
    <ChevronRightIcon className="text-gray-200" />
    <span>{directory.name}</span>
  </List.Item>
}