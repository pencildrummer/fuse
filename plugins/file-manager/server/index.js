import path from 'path'
import { Plugin, File, Directory } from '@fuse-labs/core'

export default class FileManagerPlugin extends Plugin {

  initSocket(socket) {
    socket.on('dir:list', ({ path: targetPath }, fn) => {
      // TODO - Validate if path is inside project scope?
      let directory = new Directory(targetPath)
      directory.read()
      fn(directory.entries)
    })
  
    socket.on('file:add', ({ filename, data }, fn) => {
      // TODO - Check file exists already
      let filePath = path.join(process.cwd(), 'storage', filename)
  
      // Create new file and write it to disk
      let file = new File(filePath)
      file.writeSync(data)
  
      // Notify callback
      fn?.(file)
      // Broadcast file creation
      socket.emit('file:added', file)
    })
  }

}