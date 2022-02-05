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
      type: 'directory'
    },
    {
      name: 'image',
      type: 'file',
      ext: 'png'
    },
    {
      name: 'file_3d_printer',
      type: 'file',
      ext: 'slt'
    },
    {
      name: 'raw_file',
      type: 'file',
      ext: 'gcode'
    },
    {
      name: 'image',
      type: 'file',
      ext: 'png'
    },
    {
      name: 'file_3d_printer',
      type: 'file',
      ext: 'slt'
    },
    {
      name: 'raw_file',
      type: 'file',
      ext: 'gcode'
    },
    {
      name: 'image',
      type: 'file',
      ext: 'png'
    },
    {
      name: 'file_3d_printer',
      type: 'file',
      ext: 'slt'
    },
    {
      name: 'raw_file',
      type: 'file',
      ext: 'gcode'
    },{
      name: 'image',
      type: 'file',
      ext: 'png'
    },
    {
      name: 'file_3d_printer',
      type: 'file',
      ext: 'slt'
    },
    {
      name: 'raw_file',
      type: 'file',
      ext: 'gcode'
    },{
      name: 'image',
      type: 'file',
      ext: 'png'
    },
    {
      name: 'file_3d_printer',
      type: 'file',
      ext: 'slt'
    },
    {
      name: 'raw_file',
      type: 'file',
      ext: 'gcode'
    }
  ]

  return <List className="text-gray-400 text-xs py-1" divide={false} size="compact">
    {items?.map(item => {
      switch(item.type) {
        case 'directory': 
          return <DirectoryItem 
            directory={item} 
            onSelect={onSelect} />
        case 'file':      
          return <FileItem 
            file={item} 
            onSelect={onSelect}
            selected={selectedItem?.type == 'file' && item.name == selectedItem?.name}/>
      }
      return null
    })}
  </List>
}