import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { Widget, ScrollArea } from "@fuse-labs/core-ui";
import FileManagerProvider from "../FileManagerProvider/FileManagerProvider";
import DirectoryListing from "./DirectoryListing";
import FileBanner from "./FileBanner";
import FileManagerWidgetContextMenu from "./FileManagerWidgetContextMenu";

export default function FileManagerWidget({
  onFileAction,
  ...props
}) {

  const [selectedFile, setSelectedFile] = useState()

  function handleFileAction(action, args) {
    onFileAction?.(action, args)
  }

  return <Widget title="Files">
    <FileManagerProvider>
      <div className="h-72 flex flex-col">
        <div className="flex flex-row text-xs font-bold text-gray-400 bg-black bg-opacity-60 space-x-1 py-1 px-0.5 rounded-md">
          <DotsVerticalIcon />
          <span>
            Resources
          </span>
        </div>
        <ScrollArea className="flex-1 overflow-hidden">
          <FileManagerWidgetContextMenu onAction={handleFileAction}>
            <DirectoryListing
              path="storage"
              selectedItem={selectedFile}
              onSelect={item => item.type == 'file' && setSelectedFile(item)}/>
          </FileManagerWidgetContextMenu>
        </ScrollArea>
        {selectedFile && <FileBanner file={selectedFile} className="mt-2"/>}
      </div>
    </FileManagerProvider>
  </Widget>
}