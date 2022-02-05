import { useState } from "react";
import MainLayout from "../../../../components/layouts/MainLayout";
import { Widget } from "../../core-ui";
import FileManagerProvider, { FileManagerContext, useFileManagerContext } from "../components/FileManagerProvider";
import DirectoryListing from "../components/FileManagerWidget/DirectoryListing";
import FileManagerWidget from "../components/FileManagerWidget/FileManagerWidget";
import FileViewer from "../components/FileViewer/FileViewer";

export default function IndexPage() {

  return (
    <FileManagerProvider>
      <FileManagerContext.Consumer>{ ({ setFile}) =>
        <div className="p-3 h-full flex flex-row space-x-2">
          <div className="w-full max-w-[300px]">
            <Widget className="h-full w-full">
              <DirectoryListing onSelect={setFile}/>
            </Widget>
          </div>
          <div className="flex-1">
            <FileViewer />
          </div>
        </div>
      }</FileManagerContext.Consumer>
    </FileManagerProvider>
  )
}