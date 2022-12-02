import { ReadyParser } from "serialport";

export default class MarlinReadyParser extends ReadyParser {
  constructor(opts?: any) {
    super({
      ...opts,
      delimiter: "start",
    });
  }
}
