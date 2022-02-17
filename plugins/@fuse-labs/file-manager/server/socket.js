const { writeFileSync } = require("fs")
const { readdirSync, statSync } = require("fs-extra")
const path = require('path')
const signale = require("signale")

module.exports = (socket) => {
  socket.on('@fuse-labs.file-manager.readDir', ({ path: targetPath }, fn) => {
    // TODO - Validate if path is inside project scope?
    let contents = readdirSync(targetPath)
      .reduce((items, item) => {
        const itemPath = path.join(targetPath, item)
        const stats = statSync(itemPath)
        
        // Skip system hidden files
        if (item == '.DS_Store') {
          return [...items]
        } else if (stats.isDirectory()) {
          return [...items, {
            name: item,
            isDir: true,
            path: itemPath,
          }]
        } else {
          return [...items, {
            name: item,
            ext: path.extname(item),
            size: stats.size,
            path: itemPath,
            mtimeMs: stats.mtimeMs,
            birthtimeMs: stats.birthtimeMs
          }]
        }
      }, [])
    fn(contents)
  })

  socket.on('@fuse-labs.file-manager.file:add', ({ filename }, fileData, fn) => {
    // TODO - Check file exists already
    let filePath = path.join(process.cwd(), 'storage', filename)
    writeFileSync(filePath, fileData)
    fn?.(true)
  })
}