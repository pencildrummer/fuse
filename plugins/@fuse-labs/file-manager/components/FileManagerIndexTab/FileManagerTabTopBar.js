import { CardStackIcon, DotsVerticalIcon, FilePlusIcon } from "@radix-ui/react-icons";
import socket from "lib/client/socket";
import { Button, Group } from "plugins/@fuse-labs/core-ui";
import { useRef } from "react";
import { useFileManagerContext } from "../FileManagerProvider";

export default function FileManagerTabTopBar() {

  const { setPendingFiles } = useFileManagerContext()
  const fileInputRef = useRef()

  function handleAddFileClick() {
    fileInputRef.current.click()
  }

  function handleChangedFile(e) {
    setPendingFiles(files => [...files, ...e.target.files])
    // Request add file
    let filesArray = [ ...e.target.files ]
    filesArray.forEach((file, i) => {
      // Request file add
      socket.emit('file:add', { filename: file.name, data: file }, (file) => {
        // Remove file from pending list
        setPendingFiles(files => files.splice(i, 1))
      })
    })
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
          <input type="file" ref={fileInputRef} onChange={handleChangedFile} className="hidden invisible" />
        </Button>
        <Button squared mode="ghost">
          <CardStackIcon />
        </Button>
      </div>
    </Group>
  )
}