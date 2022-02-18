import classNames from "classnames"
import socket from "lib/client/socket"
import { useEffect, useState } from "react"
import { List } from "../../../core-ui"
import { useFileManagerContext } from "../FileManagerProvider"
import DirectoryItem from "./DirectoryItem"
import FileItem from "./FileItem"

export default function DirectoryListing({
  path = '.',
  selectedItem,
  onSelect,
  ...props
}) {

  const { file, setFile } = useFileManagerContext()
  const [items, setItems] = useState([])

  function readDir() {
    // Request socket to read directory
    socket.emit('@fuse-labs.file-manager.readDir', { path }, data => {
      setItems(data)
    })
  }

  function cleanPath(path) {
    return path.slice(path.length-1) == '/' ? path.slice(0, -1) : path
  }

  useEffect(_ => {
    // Read directoyry on mount
    readDir()

    // Add listener for newly added file in directory
    const fileAddedListener = file => {
      // Get dirname of stored file
      let dirname = file.relativePath.match(/.*\//)[0] || '.'
      if (cleanPath(path) == cleanPath(dirname)) {
        readDir()
      }
    }
    socket.on('@fuse-labs.file-manager.file:added', fileAddedListener)
    return _ => {
      socket.off('@fuse-labs.file-manager.file:added', fileAddedListener)
    }
  }, [])

  return <List className="text-gray-400 text-xs" divide={false} size="compact">
    {items?.map((item, i) => {
      return item.isDir
        ? <DirectoryItem 
          key={`list-item-${i}`}
          dirname={path}
          item={item} />
        : <FileItem 
          key={`list-item-${i}`}
          item={item}
          onSelect={setFile}
          selected={item.path == file?.path}/>
    })}
  </List>
}