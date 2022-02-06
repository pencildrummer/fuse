const { exec } = require("child_process")
const SerialPort = require("serialport/lib")

module.exports = (socket) => {
  socket.on('core.serial.list', async (name, fn) => {
    SerialPort.list().then(list => {
      fn(list)
    }).catch(e => fn(e))
  })
}