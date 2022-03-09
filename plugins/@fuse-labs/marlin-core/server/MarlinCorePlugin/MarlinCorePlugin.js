import { Plugin, Controller, DeviceManager } from '@fuse-labs/core/server'
import MarlinController from '../lib/MarlinController/MarlinController.js'
import signale from 'signale'
import fs from 'fs-extra'
import chalk from 'chalk'

export default class MarlinCorePlugin extends Plugin {

  provision() {
    Controller.registerControllerClass("marlin", MarlinController)
  }

  initDeviceSocket(socket) {

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

      let device = socket.device
      
      if (!device.controller) {
        signale.error('No controller registered on device', chalk.bold(device.name))
        return fn?.(false)
      }
  
      // Start print job on device MarlinController
      
      device.controller.sendGCodeFile(path) // Should be async
  
      return fn?.(true)
    })
  }

}