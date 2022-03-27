import { ReadlineParser } from 'serialport'

export default class MarlinLineParser extends ReadlineParser {
  
  constructor(opts) {
    super({
      ...opts,
      delimiter: '\n'
    })
  }

}