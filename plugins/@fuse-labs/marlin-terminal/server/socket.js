// TODO - Find a way to import event.ts for nodejs

import { generateUniqueID } from "../../../../lib/shared/uuid.js"
import { ReadlineParser } from "serialport"
import DeviceTerminal from '../lib/server/DeviceTerminal.js'
import signale from "signale"
import chalk from "chalk";
import { getDevice } from "../../../../lib/core/devices.js";

export default (socket) => {
  // Register terminal listeners
  
  socket.on('@fuse-labs.terminal.connect', (deviceId, fn) => {

    let device = getDevice(deviceId)

    // Check for existing device terminal
    if (!device.terminal) {
      // Create DeviceTerminal
      device.terminal = new DeviceTerminal(device)
      signale.info('Added terminal to device ', device.id)
    }

    if (device.terminal.isOpen) {
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

    // TODO - Create on method for terminal
    device.terminal.serialPort.on('open', _ => {
      signale.success('Opened connection on', chalk.greenBright(device.terminal.serialPort.path))
      // Broadcast open connection result
      socket.emit('@fuse-labs.terminal.connected', deviceId)
      // Send human readable message
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Connection opened'
      })
      // Call callback function
      fn?.(true)
    })

    device.terminal.serialPort.on('close', error => {
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
        // Remove device terminal
        delete device.terminal
      }
    })

    device.terminal.serialPort.on('error', error => {
      signale.error('Error received', error)
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Error: '+error.message
      })
    })

    let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}))
    // Attach data listener on parser instead of port to get data already parsed
    parser.on('data', data => {
      socket.emit('@fuse-labs.terminal.message', {
        id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
        from: 'device',
        message: data
      })
    })
  })

  // Received terminal message from socket
  socket.on('@fuse-labs.terminal.message', (args, fn) => {

    // Broadcast the same message, attaching received flag, to notify client 
    socket.emit('@fuse-labs.terminal.message', {
      ...args,
      received: true
    })

    const { message, deviceId } = args

    let device = getDevice(deviceId)

    if (!device.terminal) {
      fn?.(false)
      throw new Error(`No terminal serial port initialized for device '${deviceId}'`)
    }
    
    // Send message to serial port, as recevied, CR or NL must be added in Terminal when sending
    device.terminal.send(message)
    fn?.(true)
  })

  /**
   * Disconnect from serial port
   */
  socket.on('@fuse-labs.terminal.disconnect', (deviceId, fn) => {
    let device = getDevice(deviceId)
    if (!device.terminal) {
      fn?.(false)
      throw new Error(`No serial port to close for device '${deviceId}'`)
    }

    // Request close of connection
    device.terminal.close()
  })
}