// TODO - Find a way to import event.ts for nodejs

import { generateUniqueID } from "../../../../lib/shared/uuid.js"
import { ReadlineParser, ReadyParser } from "serialport"
import DeviceTerminal from '../lib/server/DeviceTerminal.js'
import signale from "signale"
import chalk from "chalk";
import { getDevice } from "../../../../lib/core/devices.js";

export default (socket) => {
  // Register terminal listeners

  signale.debug('SOCKET TEMRINAL', socket.nsp.name)
  
  socket.on('open', (deviceId, fn) => {

    let device = getDevice(deviceId)

    // Check for existing device terminal
    if (!device.terminal) {
      // Create DeviceTerminal
      device.terminal = new DeviceTerminal(device, (err) => {
        signale.log('Connecting DeviceTerminal in server')
        if (err) {
          signale.error('Error creating DeviceTerminal:', err)
          socket.emit('message', {
            id: 'server-'+generateUniqueID(),
            from: 'server',
            message: 'Error connecting to device - ' + err.message
          })
        }
      })

      // Add DeviceTerminal listeners
      device.terminal.on('open', _ => {
        signale.success('Terminal connected to device', chalk.greenBright(device.name))
        // Broadcast open connection result
        socket.emit('connected', deviceId)
        // Send human readable message
        socketSendMessage('Connection opened', 'device')
        // Call callback function
        fn?.(true)
  
        
        signale.info('Attaching listener for data')
  
        // This is for Marlin based
        // Attach readyParser and then pipi readline parser to readyParser
        let readyParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
        readyParser.on('ready', _ => signale.success('READY received!'))
        let parser = readyParser.pipe(new ReadlineParser({ delimiter: '\n' }))
        //let parser = device.terminal.serialPort.pipe(new ReadlineParser({ delimiter: '\n' }))
        parser.on('data', data => {
          signale.info('Received data from parser', data)
          socketSendMessage(data, 'device')
          // socket.emit('message', {
          //   id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
          //   from: 'device',
          //   message: data
          // })
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
        //   socket.emit('message', {
        //     id: 'device-data-'+Math.floor(Math.random()*100000).toString(),
        //     from: 'device',
        //     message: data
        //   })
        // })
      })
  
      device.terminal.on('close', error => {
        if (error) {
          signale.error('Closed device terminal connection due to error', error)
          socketSendMessage('Connection closed due to error: '+error.message, 'device')
        } else {
          signale.info('Closed device terminal connection for ', device.id)
          // Normal close request
          socketSendMessage('Connection closed', 'device')
          // Remove device terminal
          delete device.terminal
        }
      })
  
      device.terminal.on('error', error => {
        signale.error('Error received', error)
        socketSendMessage('Error: '+error.message, 'device')
      })

      signale.star('Added terminal to device ', chalk.bold(device.name), device.id)
    }

    if (device.terminal.isOpen) {
      socketSendMessage('Already connected', 'server')
      return fn?.(true)
    } else {
      // Send message from server notify connection start process
      socketSendMessage('Connecting to device...', 'server')
      device.terminal.open()
    }
  })

  // Received terminal message from socket
  socket.on('message', (args, fn) => {

    signale.star('Received message', args)
    // Broadcast the same message, attaching received flag, to notify client 
    socket.emit('message', {
      ...args,
      received: true
    })

    const { message, deviceId } = args

    let device = getDevice(deviceId)

    if (device.terminal) {
      // Send message to serial port, as recevied, CR or NL must be added in Terminal when sending
      device.terminal.send(message)
      fn?.(true)
    } else {
      signale.error('No terminal initialized for device', chalk.bold(device.name), device.id)
      fn?.(false)
    }
    
    
  })

  /**
   * Request manual disconnect from serial port
   */
  socket.on('close', (deviceId, fn) => {
    let device = getDevice(deviceId)
    if (!device.terminal) {
      signale.error('No serial port to close for device', chalk.bold(device.name), device.id)
      fn?.(false)
    }

    // Request close of connection
    device.terminal.close()
  })

  /**
   * Received disconnection event from client socket
   */
  socket.on('disconnect', _ => {
    signale.warn('Should close terminal connection')
    // We need to know which device, or get every device and close all terminals
    //let device = getDevice(deviceId)
    //device.terminal?.close()
  })

  // Internal fn
  function socketSendMessage(message, from) {
    socket.emit('message', {
      id: from.toLowerCase()+'-'+generateUniqueID(),
      from: from.toLowerCase(),
      message: message
    })
  }

}