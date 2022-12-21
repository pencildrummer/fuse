import { usePlugin } from "@fuse-labs/core-client";
import { Button, Group } from "@fuse-labs/core-ui";
import {
  CardStackIcon,
  DotsVerticalIcon,
  FilePlusIcon,
} from "@radix-ui/react-icons";
import { useRef } from "react";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider";

export default function FileManagerTabTopBar() {
  const plugin = usePlugin("@fuse-labs/file-manager");
  const { setPendingFiles } = useFileManagerContext();
  const fileInputRef = useRef();

  function handleAddFileClick() {
    fileInputRef.current.click();
  }

  function handleChangedFile(e) {
    // Append file to list of pending transfer
    setPendingFiles((files) => [...files, ...e.target.files]);
    // Request add file
    [...e.target.files].forEach((file, i) => {
      // Request file add
      plugin.socket.emit(
        "file:add",
        { filename: file.name, data: file },
        (file) => {
          // Remove file from pending list
          setPendingFiles((files) => {
            files.splice(i, 1);
            return [...files];
          });
        }
      );
    });
  }

  return (
    <Group className="h-9 bg-black/60 p-1">
      <div className="flex flex-row items-center flex-1">
        <DotsVerticalIcon />
        <span className="font-bold">File manager</span>
      </div>
      <div className="flex flex-row items-center space-x-0.5">
        <Button squared mode="ghost" onClick={handleAddFileClick}>
          <FilePlusIcon />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChangedFile}
            className="hidden invisible"
          />
        </Button>
        <Button squared mode="ghost">
          <CardStackIcon />
        </Button>
      </div>
    </Group>
  );
}
