import { Plugin, Controller } from '@fuse-labs/core/server'
import MarlinController from '../lib/MarlinController/MarlinController.js'

export default class MarlinCorePlugin extends Plugin {

  provision() {
    Controller.registerControllerClass("marlin", MarlinController)
  }

}