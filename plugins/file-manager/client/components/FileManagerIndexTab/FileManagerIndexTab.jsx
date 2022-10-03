import { ScrollArea, Widget } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider.jsx";
import DirectoryListing from "../FileManagerWidget/DirectoryListing.jsx";
import FileManagerWidgetContextMenu from "../FileManagerWidget/FileManagerWidgetContextMenu.jsx";
import PendingFilesList from "../FileManagerWidget/PendingFilesList.jsx";
import FileViewer from "../FileViewer/FileViewer.jsx";
import FileManagerTabTopBar from "./FileManagerTabTopBar.jsx";

export default function FileManagerIndexTab() {
  const { file, setFile } = useFileManagerContext();

  return (
    <div className="p-3 h-full flex flex-row space-x-2">
      <div className="w-full" style={{ maxWidth: 300 }}>
        <Widget full className="h-full w-full">
          <FileManagerTabTopBar />

          <ScrollArea className="flex-1 overflow-hidden px-3">
            <FileManagerWidgetContextMenu>
              <DirectoryListing
                path="storage"
                onSelect={setFile}
                selectedItem={file}
              />
            </FileManagerWidgetContextMenu>
          </ScrollArea>

          <PendingFilesList />
        </Widget>
      </div>
      <div className="flex-1">
        <FileViewer />
      </div>
    </div>
  );
}
