// TODO - Find a way to import event.ts for nodejs

import { generateUniqueID } from "../../../../lib/shared/uuid.js"
import { SerialPort, ReadlineParser } from "serialport"
import signale from "signale"
import chalk from "chalk";

let serialPorts = {};

export default (socket) => {
  // Register terminal listeners
  
  socket.on('@fuse-labs.terminal.connect', (args, fn) => {

    // Get params
    const { port, baudrate } = args

    // Get existing port if any
    let serialPort

    serialPort = serialPorts[port]

    if (serialPort && serialPort.isOpen) {
      socket.emit('@fuse-labs.terminal.message', {
        id: 'server-'+generateUniqueID(),
        from: 'server',
        message: 'Already connected'
      })
      return fn?.(true)
    }

    // Send message from server notify connection start process
    socket.emit('@fuse-labs.terminal.message', {
      id: 'server-'+generateUniqueID(),
      from: 'server',
      message: 'Connecting to device...'
    })

    // Create serial port
    serialPort = new SerialPort({
      path: port,
      baudRate: baudrate
    })

    serialPort.on('open', _ => {
      signale.success('Opened connection on', chalk.greenBright(serialPort.path))
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Connection opened'
      })
    })

    serialPort.on('close', error => {
      if (error) {
        signale.error('Closed connection due to error', error)
        socket.emit('@fuse-labs.terminal.message', {
          id: 'device-'+generateUniqueID(),
          from: 'device',
          message: 'Connection closed due to error: '+error.message
        })
      } else {
        // Normal close request
        socket.emit('@fuse-labs.terminal.message', {
          id: 'device-'+generateUniqueID(),
          from: 'device',
          message: 'Connection closed'
        })
        // Discard this serial port from array
        delete serialPorts[serialPort.path]
      }
    })

    serialPort.on('error', error => {
      signale.error('Error received', error)
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Error: '+error.message
      })
    })

    let parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}))
    // Attach data listener on parser instead of port to get data already parsed
    parser.on('data', data => {
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
        from: 'device',
        message: data
      })
    })

    // Push new serial port to global array
    serialPorts[serialPort.path] = serialPort
  })

  // Received terminal message from socket
  socket.on('@fuse-labs.terminal.message', (args, fn) => {

    // Broadcast the same message, attaching received flag, to notify client 
    socket.emit('@fuse-labs.terminal.message', {
      ...args,
      received: true
    })

    // Get params
    const { port, message } = args

    // Retrieve requested serial port
    let serialPort = serialPorts[port]

    if (!serialPort) {
      fn?.(false)
      throw new Error('No serial port initialized for path ', port)
    }
    
    // Send message to serial port, as recevied, CR or NL must be added in Terminal when sending
    serialPort.write(message)
    fn?.(true)
  })

  /**
   * Disconnect from serial port
   */
  socket.on('@fuse-labs.terminal.disconnect', (args, fn) => {
    const { port } = args
    // Retrieve requested serial port
    let serialPort = serialPorts[port]

    if (!serialPort) {
      fn?.(false)
      throw new Error('No serial port initialize for path ', port)
    }

    // Request close of connection
    serialPort.close()
  })
}