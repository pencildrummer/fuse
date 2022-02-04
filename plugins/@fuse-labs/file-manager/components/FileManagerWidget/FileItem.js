import { FileIcon } from "@radix-ui/react-icons";
import { List } from "../../../core-ui";

export default function FileItem({
  file,
  ...props
}) {
  return <List.Item className="px-0.5 font-semibold rounded-md hover:bg-white hover:bg-opacity-5 transition-colors duration-150">
    <FileIcon className="text-gray-300" />
    <span>{file.name}.{file.ext}</span>
  </List.Item>
}