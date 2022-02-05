import classNames from "classnames"
import { List } from "../../../core-ui"
import DirectoryItem from "./DirectoryItem"
import FileItem from "./FileItem"

export default function DirectoryListing({
  selectedItem,
  onSelect,
  ...props
}) {

  let items = [
    {
      name: 'directory',
      kind: 'directory'
    },
    {
      name: '2018-jul-22-2-1200-1230-IMG_2937',
      kind: 'file',
      type: 'image',
      mime: 'image/jpeg',
      ext: 'jpg',
      path: '/files/2018-jul-22-2-1200-1230-IMG_2937.JPG',
      size: 6536005
    },
    {
      name: 'file_3d_printer',
      kind: 'file',
      ext: 'stl'
    },
    {
      name: 'raw_file',
      kind: 'file',
      ext: 'gcode'
    },
  ]

  return <List className="text-gray-400 text-xs py-1" divide={false} size="compact">
    {items?.map((item, i) => {
      switch(item.kind) {
        case 'directory': 
          return <DirectoryItem 
            key={`list-item-${i}`}
            directory={item} 
            onSelect={onSelect} />
        case 'file':      
          return <FileItem 
            key={`list-item-${i}`}
            file={item} 
            onSelect={onSelect}
            selected={selectedItem?.type == 'file' && item.name == selectedItem?.name}/>
      }
      return null
    })}
  </List>
}