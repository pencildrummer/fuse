import signale from "signale"
import Controller from '../../../../../src/server/lib/models/Controller/Controller.js'
import MarlinReadyParser from './MarlinReadyParser.js'
import MarlinLineParser from "./MarlinLineParser.js"

export default class MarlinController extends Controller {

  _isReady = false

  constructor(device) {
    super(device)
    // Attach readyParser and then pipe readline parser to readyParser
    let readyParser = this._device.connection.addParser(new MarlinReadyParser())
    readyParser.on('ready', _ => {
      this._isReady = true
      signale.scope('Controller:'+this.constructor.name).success('Marlin device is ready')
      this.emit('ready')
    })

    // Add Marlin parser
    let lineParser = readyParser.pipe(new MarlinLineParser())

    lineParser.on('data', data => this.handleParsedData(data))
  }

  /**
   * Helper method to write to connection. This is the same as calling device.connection.write(data)
   * @param {*} data 
   */
  write(data) {
    if (!this._device.connection.isOpen) {
      signale.error('Unable to write data, connection not open')
    } else {
      this._device.connection.write(data)
    }
  }

  /**
   * 
   * @param {*} data 
   */
  printGCode(lines) {
    // TEST
    let ready = true
    let linePosition = 0
    while (ready && linePosition < lines.length) {
      let line = lines[linePosition]
      signale.debug('PRINTING GCODE LINE:', line)
      this.write(line)
      // TODO - Wait for readiness
      linePosition++
    } 
  }

  /**
   * Private
   */

  handleParsedData(data) {
    signale.scope('Controller:'+this.constructor.name).info('Received data:', data)
    this.emit('data', data)
  }

}

