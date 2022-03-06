import { ScrollArea, Widget } from "@fuse-labs/core-ui";
import { useCallback } from "react";
import { useFileManagerContext } from "../FileManagerProvider";
import DirectoryListing from "../FileManagerWidget/DirectoryListing";
import FileManagerWidgetContextMenu from "../FileManagerWidget/FileManagerWidgetContextMenu";
import PendingFilesList from "../FileManagerWidget/PendingFilesList";
import FileViewer from "../FileViewer/FileViewer";
import FileManagerTabTopBar from "./FileManagerTabTopBar";

export default function FileManagerIndexTab() {

  const { file, setFile } = useFileManagerContext()

  return (
    <div className="p-3 h-full flex flex-row space-x-2">
      <div className="w-full max-w-[300px]">
        <Widget full className="h-full w-full">

          <FileManagerTabTopBar />

          <ScrollArea className="flex-1 overflow-hidden px-3">
            <FileManagerWidgetContextMenu>
              <DirectoryListing path="storage"
                onSelect={setFile} selectedItem={file} />
            </FileManagerWidgetContextMenu>
          </ScrollArea>

          <PendingFilesList />
        </Widget>
      </div>
      <div className="flex-1">
        <FileViewer />
      </div>
    </div>
  )
}