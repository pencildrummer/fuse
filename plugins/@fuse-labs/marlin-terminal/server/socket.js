// TODO - Find a way to import event.ts for nodejs

module.exports = (socket) => {
  // Register terminal listeners
  
  // Received terminal message from socket
  socket.on('@fuse-labs.terminal.message', message => {
    // Broadcast it
    socket.emit('@fuse-labs.terminal.message', message)
  })
}