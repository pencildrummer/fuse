import { useEffect, useState } from "react";
import { usePlugin } from "@fuse-labs/core-client";
import { List } from "@fuse-labs/core-ui";
import { useFileManagerContext } from "../FileManagerProvider/FileManagerProvider.jsx";
import DirectoryItem from "./DirectoryItem.jsx";
import FileItem from "./FileItem.jsx";

export default function DirectoryListing({
  path = ".",
  selectedItem,
  onSelect,
  ...props
}) {
  const plugin = usePlugin("@fuse-labs/file-manager");

  const { file, setFile } = useFileManagerContext();
  const [items, setItems] = useState([]);

  function readDir() {
    // Request socket to read directory
    plugin.socket.emit("dir:list", { path }, (data) => {
      setItems(data);
    });
  }

  function cleanPath(path) {
    return path.slice(path.length - 1) == "/" ? path.slice(0, -1) : path;
  }

  useEffect(() => {
    // Read directoyry on mount
    readDir();

    // Add listener for newly added file in directory
    const fileAddedListener = (file) => {
      // Get dirname of stored file
      let dirname = file.path.match(/.*\//)[0] || ".";
      if (cleanPath(path) == cleanPath(dirname)) {
        readDir();
      }
    };
    plugin.socket.on("file:added", fileAddedListener);
    return () => {
      plugin.socket.off("file:added", fileAddedListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List className="text-gray-400 text-xs" divide={false} size="compact">
      {items?.map((item, i) => {
        return item.isDir ? (
          <DirectoryItem
            key={`list-item-${i}`}
            data-path={item.path}
            dirname={path}
            item={item}
          />
        ) : (
          <FileItem
            key={`list-item-${i}`}
            data-path={item.path}
            item={item}
            onSelect={setFile}
            selected={item.path == file?.path}
          />
        );
      })}
    </List>
  );
}
