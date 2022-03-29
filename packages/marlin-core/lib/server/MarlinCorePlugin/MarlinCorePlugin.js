import { Plugin, Controller } from '@fuse-labs/core/server'
import MarlinController from '../lib/MarlinController/MarlinController.js'
import fs from 'fs-extra'
import chalk from 'chalk'

export default class MarlinCorePlugin extends Plugin {

  provision() {
    Controller.registerControllerClass("marlin", MarlinController)
  }

  initDeviceSocket(socket) {

    /**
     * List queue jobs
     */
    socket.on('queue:jobs', (fn) => {
      let device = socket.device
      // TODO - Check for controller in device middleware?
      return fn?.(device.controller.jobs)
    })

    socket.on('job:start', (jobID, fn) => {
      socket.device.controller.startJob(jobID)
      fn?.(true)
    })

    socket.on('job:pause', (jobID, fn) => {
      socket.device.controller.pauseJob(jobID)
      fn?.(true)
    })

    socket.on('job:resume', (jobID, fn) => {
      socket.device.controller.resumeJob(jobID)
      fn?.(true)
    })

    socket.on('job:stop', (jobID, fn) => {
      socket.device.controller.stopJob(jobID)
      fn?.(true)
    })

    socket.on('print:file', (path, fn) => {
      if (!path) {
        console.error('Missing file path to start print')
        return fn?.(false)
      }
  
      // TODO - Use FileManager plugin class?
      // Get file
      if (!fs.existsSync(path)) {
        console.error('Missing file at path: ', path)
        return fn?.(false)
      }

      let device = socket.device
      
      if (!device.controller) {
        console.error('No controller registered on device', chalk.bold(device.name))
        return fn?.(false)
      }
  
      // Start print job on device MarlinController
      
      device.controller.sendGCodeFile(path) // Should be async
  
      return fn?.(true)
    })
  }

}