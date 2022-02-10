import { ScrollArea, Widget } from "../../core-ui";
import FileManagerProvider, { FileManagerContextConsumer } from "../components/FileManagerProvider";
import DirectoryListing from "../components/FileManagerWidget/DirectoryListing";
import FileManagerWidgetContextMenu from "../components/FileManagerWidget/FileManagerWidgetContextMenu";
import FileViewer from "../components/FileViewer/FileViewer";

export default function IndexPage() {

  return (
    <FileManagerProvider>
      <FileManagerContextConsumer>{ ({ setFile, file }) =>
        <div className="p-3 h-full flex flex-row space-x-2">
          <div className="w-full max-w-[300px]">
            <Widget className="h-full w-full">
              <ScrollArea className="flex-1 overflow-hidden">
                <FileManagerWidgetContextMenu>
                  <DirectoryListing onSelect={setFile} selectedItem={file} />
                </FileManagerWidgetContextMenu>
              </ScrollArea>
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