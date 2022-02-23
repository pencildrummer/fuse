// TODO - Find a way to import event.ts for nodejs

import { generateUniqueID } from "../../../../lib/shared/uuid.js"
import { ReadlineParser, ReadyParser } from "serialport"
import DeviceTerminal from '../lib/server/DeviceTerminal.js'
import signale from "signale"
import chalk from "chalk";
import { getDevice } from "../../../../lib/core/devices.js";

export default (socket) => {
  // Register terminal listeners
  
  socket.on('open', (deviceId, fn) => {

    let device = getDevice(deviceId)

    // Check for existing device terminal
    if (!device.terminal) {
      // Create DeviceTerminal
      device.terminal = new DeviceTerminal(device, (err) => {
        if (err) {
          signale.error('Error creating DeviceTerminal:', err)
          socket.emit('message', {
            id: 'server-'+generateUniqueID(),
            from: 'server',
            message: 'Error connecting to device - ' + err.message
          })
        }
      })
      signale.info('Added terminal to device ', device.id)
    }

    if (device.terminal.isOpen) {
      socket.emit('message', {
        id: 'server-'+generateUniqueID(),
        from: 'server',
        message: 'Already connected'
      })
      return fn?.(true)
    }

    // Send message from server notify connection start process
    socket.emit('message', {
      id: 'server-'+generateUniqueID(),
      from: 'server',
      message: 'Connecting to device...'
    })

    // TODO - Create on method for terminal
    device.terminal.serialPort.on('open', _ => {
      signale.success('Opened connection on', chalk.greenBright(device.terminal.serialPort.path))
      // Broadcast open connection result
      socket.emit('connected', deviceId)
      // Send human readable message
      socket.emit('message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Connection opened'
      })
      // Call callback function
      fn?.(true)

      // Add reader listener
      signale.info('Port is open?', device.terminal.isOpen)
      
      signale.info('Attaching listener for data')

      // This is for Marlin based
      // Attach readyParser and then pipi readline parser to readyParser
      let readyParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
      readyParser.on('ready', _ => signale.success('READY received!'))
      let parser = readyParser.pipe(new ReadlineParser({ delimiter: '\n' }))
      //let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\n' }))
      parser.on('data', data => {
        signale.info('Received data from parser', data)
        socket.emit('message', {
          id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
          from: 'device',
          message: data
        })
      })

      // let readyParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
      // readyParser.on('ready', _ => signale.info('READY received!'))
      // readyParser.on('data', data => signale.debug('Received data on parser', data))

      //
      // This is for - ARDUINO - GRBL - MAke different conneciton based on device connecte
      //
      // let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\r\n'}))
      // // Attach data listener on parser instead of port to get data already parsed
      // parser.on('data', data => {
      //   signale.info('Received data from parser', data)
      //   socket.emit('@fuse-labs.terminal.message', {
      //     id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
      //     from: 'device',
      //     message: data
      //   })
      // })
    })

    device.terminal.serialPort.on('close', error => {
      if (error) {
        signale.error('Closed connection due to error', error)
        socket.emit('message', {
          id: 'device-'+generateUniqueID(),
          from: 'device',
          message: 'Connection closed due to error: '+error.message
        })
      } else {
        signale.info('Closed connection for ', device.id)
        // Normal close request
        socket.emit('message', {
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
      socket.emit('message', {
        id: 'device-'+generateUniqueID(),
        from: 'device',
        message: 'Error: '+error.message
      })
    })
  })

  // Received terminal message from socket
  socket.on('message', (args, fn) => {

    // Broadcast the same message, attaching received flag, to notify client 
    socket.emit('message', {
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
  socket.on('close', (deviceId, fn) => {
    let device = getDevice(deviceId)
    if (!device.terminal) {
      fn?.(false)
      throw new Error(`No serial port to close for device '${deviceId}'`)
    }

    // Request close of connection
    device.terminal.close()
  })
}