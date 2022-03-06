import signale from 'signale'
import fs from 'fs-extra'
import parser from 'gcode-parser'
import { getDevice, getDeviceIdFromSocket } from '@fuse-labs/core'
import chalk from 'chalk'

export default function setup(socket) {

  socket.on('print:file', (path, fn) => {
    if (!path) {
      signale.error('Missing file path to start print')
      return fn?.(false)
    }

    // TODO - Use FileManager plugin class?
    // Get file
    if (!fs.existsSync(path)) {
      signale.error('Missing file at path: ', path)
      return fn?.(false)
    }
    
    // Parse GCODE
    signale.pending('Parsing file', path)
    let lines = parser.parseFileSync(path)
    
    // Get device

    let deviceId = getDeviceIdFromSocket(socket)
    if (!deviceId) {
      signale.error('Unable to identify deviceId')
      return fn?.(false)
    }

    let device = getDevice(deviceId)
    if (!device) {
      signale.error('No device found for id', chalk.redBright(deviceId))
      return fn?.(false)
    }

    if (!device.controller) {
      signale.error('No controller registered on device', chalk.bold(device.name))
      return fn?.(false)
    }

    // Start print job on device MarlinController

    device.controller.printGCode(lines) // Should be async

    return fn?.(true)
  })
}