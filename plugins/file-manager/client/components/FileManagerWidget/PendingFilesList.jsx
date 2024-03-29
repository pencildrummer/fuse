import { useEffect } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Group, Progress } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider.jsx";

export default function PendingFilesList() {
  const { pendingFiles } = useFileManagerContext();

  useEffect(() => {
    console.log("Updated files", pendingFiles);
  }, [pendingFiles]);

  return (
    <div className="flex flex-col space-y-1 p-1">
      {pendingFiles?.map((file) => (
        <PendingFileListItem key={`file-${file.name}`} file={file} />
      ))}
    </div>
  );
}

function PendingFileListItem({ file }) {
  return (
    <div className="bg-gray-800 rounded-t-md rounded-b-sm text-gray-400 overflow-hidden pb-0">
      <Group className="p-2">
        <span className="font-bold text-xs truncate">{file.name}</span>
        <Button size="xs" mode="ghost" squared rounded>
          <Cross2Icon />
        </Button>
      </Group>
      <div>
        <Progress value={60} max={100} />
      </div>
    </div>
  );
}
