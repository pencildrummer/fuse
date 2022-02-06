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

  useEffect(_ => {
    // Request socket to read directory
    socket.emit('@fuse-labs.file-manager.readDir', { path }, data => {
      setItems(data)
    })
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