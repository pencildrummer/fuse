import { FileIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { List } from "../../../core-ui";

export default function FileItem({
  file,
  selected,
  selectable = true,
  onSelect,
  ...props
}) {
  return <List.Item className={classNames(
    'px-0.5 font-semibold rounded-md transition-colors duration-150',
    {
      'cursor-pointer': selectable,
      'hover:bg-white hover:bg-opacity-5': !selected,
      'bg-blue-700 text-gray-50': selected,
    }
  )} onClick={_ => onSelect(file)}>
    <FileIcon className="text-gray-300" />
    <span>{file.name}.{file.ext}</span>
  </List.Item>
}