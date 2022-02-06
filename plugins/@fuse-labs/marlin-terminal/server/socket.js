// TODO - Find a way to import event.ts for nodejs

module.exports = (socket) => {
  // Register terminal listeners
  
  // Received terminal message from socket
  socket.on('@fuse-labs.terminal.message', (args) => {
    // Broadcast it, attaching received flag
    socket.emit('@fuse-labs.terminal.message', {
      ...args,
      received: true
    })
  })

  // DEMO - Automatic status message
  // setInterval(_ => {
  //   socket.emit('@fuse-labs.terminal.message', {
  //     id: 'test-status-'+Math.floor(Math.random()*100000).toString(),
  //     from: 'device',
  //     message: 'Status OK'
  //   })
  // }, 1000)
}