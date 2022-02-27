import { EventEmitter } from 'events'
import signale from 'signale'

export default class Driver extends EventEmitter {

  logger = signale.scope(this.constructor.name)

  _serialPort

  constructor(serialPort) {
    super()
    this._serialPort = serialPort
    this.initParser()
  }

  initParser() {
    throw new Error('Missing initParser implementation on', this.constructor.name)
  }

}