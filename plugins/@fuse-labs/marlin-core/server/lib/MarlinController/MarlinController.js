import signale from "signale"
import path from 'path'
import { Controller } from '@fuse-labs/core/server'
import MarlinReadyParser from './MarlinReadyParser.js'
import MarlinLineParser from "./MarlinLineParser.js"
import parser from 'gcode-parser'
import MarlinGCodeJob from "./MarlinGCodeJob.js"
import TemperatureParser from "./data-parser/TemperatureParser.js"
import OkParser from "./data-parser/OkParser.js"

// Keep here in case we need it later
// const LineEnding = Object.freeze({
//   None: 0,
//   CarriageReturn: 1,
//   NewLine: 2,
//   CarriageReturnAndNewLine: 3
// })

export default class MarlinController extends Controller {

  _isReady = false

  // TODO - Check if should we use serialport parser, or leave this as a Fuse internal parser thing or even for MarlinController
  _parsers = [
    new OkParser(),
    new TemperatureParser()
  ]

  constructor(device) {
    super(device)
    // Attach readyParser and then pipe readline parser to readyParser
    let readyParser = this._device.connection.addParser(new MarlinReadyParser())
    readyParser.on('ready', _ => {
      this._isReady = true
      signale.scope('Controller:'+this.constructor.name).success('Marlin device is ready')
      this.emit('ready')
    })

    // Add Marlin parser on connection
    let lineParser = readyParser.pipe(new MarlinLineParser())
    lineParser.on('data', data => this.handleParsedData(data))
  }

  /**
   * Helper method to write to connection. This is the same as calling device.connection.write(data)
   * With this you can write any type of data and you are in charge for any formatting (eg: line endings in text, ...)
   * @param {*} data 
   */
  write(data) {
    if (!this._device.connection.isOpen) {
      let error = new Error('Unable to write data, connection not open')
      this.emit('error', error)
      signale.error(error)
    } else {
      console.info('Writing data on device connection', data)
      this.emit('write', data)
      this._device.connection.write(data)//, { encoding: 'latin1' }
    }
  }

  /**
   * Helper method to send GCode commands. Do not append line endings, it will be appended automatically.
   * @param {string} command 
   */
  sendCommand(command) {
    if (typeof command !== 'string')
      throw new Error('command must be of type string, got' + typeof command)

    // Auto append \n
    this.write(command + '\n')
  }

  sendGCodeFile(filePath) {
    // Parse GCODE
    signale.pending('Parsing file', filePath)
    let lines = parser.parseFileSync(filePath)
    // TODO - Validate result
    signale.complete('Parsing completed - tot lines:', lines.length)

    // Create new job
    let job = new MarlinGCodeJob(this, lines)
    job.start()
  }

  /**
   * Private
   */

  handleParsedData(data) {
    signale.scope('Controller:'+this.constructor.name).info('Received data:', data)
    this.emit('data', data)

    // // If data is 'ok' or starts with Ok the latest command has finished performing
    // switch (data) {
    //   case 'ok':
    //     this.emit('data:ok', data)
    //     break
    // }

    // Check parsers
    this._parsers.forEach(parser => {
      if (parser.match(data)) {
        let parsedData = parser.parse(data, this)
      }
    })

  }

}

