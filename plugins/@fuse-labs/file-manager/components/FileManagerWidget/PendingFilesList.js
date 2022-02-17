import { Cross2Icon } from "@radix-ui/react-icons"
import { Button, Group, Progress } from "plugins/@fuse-labs/core-ui"

export default function PendingFilesList({
  files
}) {
  return (
    <div className="flex flex-col space-x-1">
      {files?.map(file => 
        <PendingFileListItem file={file} />
      )}
    </div>
  )
}

function PendingFileListItem({
  file
}) {
  console.log(file)
  return (
    <div className="bg-gray-800 rounded-t-md rounded-b-sm text-gray-400 overflow-hidden pb-0">
      <Group className="p-2">
        <span className="font-bold text-xs truncate">
          {file.name}
        </span>
        <Button size="xs" type="ghost" squared rounded>
          <Cross2Icon />
        </Button>
      </Group>
      <div>
        <Progress value={60} max={100} />
      </div>
    </div>
  )
}