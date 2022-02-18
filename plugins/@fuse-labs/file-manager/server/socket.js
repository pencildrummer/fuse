import path from "path"
import signale from "signale"
import FileManager from "../../../../lib/shared/models/FileManager.js"
import File from "../../../../lib/shared/models/File.js"
import Directory from "../../../../lib/shared/models/Directory.js"

export default (socket) => {
  socket.on('@fuse-labs.file-manager.readDir', ({ path: targetPath }, fn) => {
    // TODO - Validate if path is inside project scope?
    let directory = new Directory(targetPath)
    directory.read()
    fn(directory.entries)
  })

  socket.on('@fuse-labs.file-manager.file:add', ({ filename, data }, fn) => {
    // TODO - Check file exists already
    let filePath = path.join(process.cwd(), 'storage', filename)

    // Create new file and write it to disk
    let file = new File(filePath)
    file.writeSync(data)

    // Notify callback
    fn?.(file)
    // Broadcast file creation
    socket.emit('@fuse-labs.file-manager.file:added', file)
  })
}