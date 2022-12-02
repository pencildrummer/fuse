import { ReadlineParser } from "serialport";

export default class MarlinLineParser extends ReadlineParser {
  constructor(opts?: any) {
    super({
      ...opts,
      delimiter: "\n",
    });
  }
}
