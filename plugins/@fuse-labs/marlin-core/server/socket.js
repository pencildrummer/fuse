import signale from 'signale'
import fs from 'fs-extra'
import parser from 'gcode-parser'
import { getDevice } from '../../../../lib/core/devices.js'
import getDeviceIdFromSocket from '../../../../lib/server/getDeviceIdFromSocket.js'
import chalk from 'chalk'

export default (socket) => {

  socket.on('print:file', (file, fn) => {
    if (!file) {
      signale.error('Missing file parameters to start print')
      return fn?.(false)
    }

    // TODO - Use FileManager plugin class?
    // Get file
    if (!fs.existsSync(file.path)) {
      signale.error('Missing file at path: ', file.path)
      return fn?.(false)
    }

    // Parse GCODE
    signale.pending('Parsing file', file.path)
    let lines = parser.parseFileSync(file.path)

    signale.log('Parsed', lines.length)
    
    // Start print job on DeviceTerminal or some other class

    let deviceId = getDeviceIdFromSocket(socket)
    if (!deviceId) {
      signale.error('Unable to identify deviceId')
      return fn?.(false)
    }

    signale.star('Device ID', deviceId)
    let device = getDevice(deviceId)
    if (!device) {
      signale.error('No device found for id', chalk.redBright(deviceId))
      return fn?.(false)
    }

    if (!device.terminal.isOpen) {
      device.terminal.open(err => {
        if (err) {
          signale.error('Unable to open serial port', err)
          return fn?.(false)
        } else {
          startPrinting(device, lines)
        }
      })
    } else {
      startPrinting(lines)
      fn?.(true)
    }
  })
}

function startPrinting(device, lines) {
  let ready = true
  let linePosition = 0
  while (ready && linePosition < lines.length) {
    let line = lines[linePosition]
    signale.debug('LINE', line)
    device.terminal.send(line)
    // TODO - Wait for readiness
    linePosition++
  } 
}