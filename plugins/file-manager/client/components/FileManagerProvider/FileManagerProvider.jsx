import { coreSocket, usePlugin } from "@fuse-labs/core-client";
import React, { useContext, useEffect, useState } from "react";

const FileManagerContext = React.createContext();

export const FileManagerContextConsumer = FileManagerContext.Consumer;

export function useFileManagerContext() {
  const ctx = useContext(FileManagerContext);
  if (!ctx)
    throw new Error(
      "useFileManagerContext cannot be used oustide FileManagerProvider"
    );
  return ctx;
}

export default function FileManagerProvider(props) {
  const [file, setFile] = useState();

  // The path of the item when context menu is opened
  const [focusItemPath, setFocusItemPath] = useState();

  const [pendingFiles, setPendingFiles] = useState([]);

  useEffect(() => {
    let listener = (file) => {
      console.log("Added file", file);
    };
    coreSocket.on("file:added", listener);
    return (_) => coreSocket.off("file:added", listener);
  }, []);

  return (
    <FileManagerContext.Provider
      value={{
        file,
        setFile,

        focusItemPath,
        setFocusItemPath,

        pendingFiles,
        setPendingFiles,
      }}
    >
      {props.children}
    </FileManagerContext.Provider>
  );
}
