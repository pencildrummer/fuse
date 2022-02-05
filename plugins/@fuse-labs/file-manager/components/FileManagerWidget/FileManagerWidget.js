import { DotsVerticalIcon, DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button, Widget } from "../../../core-ui";
import ContextMenu from "../../../core-ui/components/shared/ContextMenu/ContextMenu";
import ScrollArea from "../../../core-ui/components/shared/ScrollArea/ScrollArea";
import DirectoryListing from "./DirectoryListing";
import FileBanner from "./FileBanner";

export default function FileManagerWidget({
  ...props
}) {

  const [selectedFile, setSelectedFile] = useState()
  
  return <Widget title="Files">
    <div className="h-72 flex flex-col">
      <div className="flex flex-row text-xs font-bold text-gray-400 bg-black bg-opacity-60 space-x-1 py-1 px-0.5 rounded-md">
        <DotsVerticalIcon />
        <span>
          Resources
        </span>
      </div>
      <ScrollArea className="flex-1 overflow-hidden">
        <ContextMenu items={[
          {
            label: 'Save',
            icon: DownloadIcon,
            action: _ => { console.log('Save file') }
          },
          {
            label: 'Delete',
            icon: TrashIcon,
            detail: '⌫'
          },
          '-',
          {
            label: 'Print'
          }
        ]}>
          <DirectoryListing
            selectedItem={selectedFile}
            onSelect={item => item.type == 'file' && setSelectedFile(item)}/>
        </ContextMenu>
      </ScrollArea>
      {selectedFile && <FileBanner file={selectedFile} className="mt-2"/>}
    </div>
  </Widget>
}