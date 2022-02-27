import Driver from '../../core/server/Driver.js';
import { ReadyParser, ReadlineParser } from 'serialport'

export default class MarlinDriver extends Driver {

  _isReady = false;
  get isReady() { return this._isReady }

  initParser() {
    this.logger.info('Initializing parsers')
    // Attach readyParser and then pipe readline parser to readyParser
    let readyParser = this._serialPort.pipe(new ReadyParser({ delimiter: 'start' }))
    readyParser.on('ready', _ => {
      this._isReady = true
      this.logger.success('Marlin device is ready')
      this.emit('ready')
    })

    let lineParser = readyParser.pipe(new ReadlineParser({ delimiter: '\n' }))

    lineParser.on('data', data => {
      this.emit('data', data)
    })

    // let okParser = device.terminal.serialPort.pipe(new ReadyParser({ delimiter: 'ok' }))
    // okParser.on('ready', _ => signale.star('OK RECEIVED!'))
    // okParser.on('data', data => signale.star('AFTER OK data:', data.toString()))
  }
}