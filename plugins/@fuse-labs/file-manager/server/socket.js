const { readdirSync, statSync } = require("fs-extra")
const path = require('path')

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
          }]
        }
      }, [])
    fn(contents)
  })
}