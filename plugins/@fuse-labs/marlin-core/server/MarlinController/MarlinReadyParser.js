import { ReadyParser } from 'serialport'

export default class MarlinReadyParser extends ReadyParser {
  
  constructor(opts) {
    super({
      ...opts,
      delimiter: 'start'
    })
  }

}