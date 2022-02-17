import { CardStackPlusIcon, DotsVerticalIcon, FilePlusIcon } from "@radix-ui/react-icons";
import socket from "lib/client/socket";
import { useRef, useState } from "react";
import { Button, Group, ScrollArea, Widget } from "../../core-ui";
import FileManagerProvider, { FileManagerContextConsumer } from "../components/FileManagerProvider";
import DirectoryListing from "../components/FileManagerWidget/DirectoryListing";
import FileManagerWidgetContextMenu from "../components/FileManagerWidget/FileManagerWidgetContextMenu";
import PendingFilesList from "../components/FileManagerWidget/PendingFilesList";
import FileViewer from "../components/FileViewer/FileViewer";

export default function IndexPage() {

  const fileInputRef = useRef()

  const [pendingFiles, setPendingFiles] = useState([])

  function handleAddFileClick() {
    fileInputRef.current.click()
  }

  function handleChangedFile(e) {
    console.log('Selected file', e.target.files)
    setPendingFiles(files => [...files, ...e.target.files])
    // Request add file
    let filesArray = [ ...e.target.files ]
    filesArray.forEach(file => {
      let params = {
        filename: file.name
      }
      socket.emit('@fuse-labs.file-manager.file:add', params, file, (res) => {
        console.log('Callback result', res)
      })
    })
  }

  return (
    <FileManagerProvider>
      <FileManagerContextConsumer>{ ({ setFile, file }) =>
        <div className="p-3 h-full flex flex-row space-x-2">
          <div className="w-full max-w-[300px]">
            <Widget className="h-full w-full">
              <Group className="bg-black p-1 rounded-md">
                <div className="flex flex-row items-center flex-1">
                  <DotsVerticalIcon />
                  <span>File manager</span>
                </div>
                <div className="flex flex-row items-center space-x-0.5">
                  <Button squared type="ghost" onClick={handleAddFileClick}>
                    <FilePlusIcon />
                    <input type="file" ref={fileInputRef} onChange={handleChangedFile} className="hidden invisible" />
                  </Button>
                  <Button squared type="ghost">
                    <CardStackPlusIcon />
                  </Button>
                </div>
              </Group>

              <ScrollArea className="flex-1 overflow-hidden">
                <FileManagerWidgetContextMenu>
                  <DirectoryListing path="storage" onSelect={setFile} selectedItem={file} />
                </FileManagerWidgetContextMenu>
              </ScrollArea>

              <PendingFilesList files={pendingFiles} />
            </Widget>
          </div>
          <div className="flex-1">
            <FileViewer />
          </div>
        </div>
      }</FileManagerContextConsumer>
    </FileManagerProvider>
  )
}