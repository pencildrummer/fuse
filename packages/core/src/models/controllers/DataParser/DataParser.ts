export interface DataParseInterface<T = any> {
  match: (data: any) => boolean;
  parse: (data: any) => T;
}

export default class DataParser<T> implements DataParseInterface<T> {
  protected eventName: string;

  constructor() {
    if (this.constructor === DataParser)
      throw new Error("DataParser is an abstarct class to be extended");

    if (!this.eventName) {
      // Set an automatic event name, if the class adhere to name convention the name of the event will be perfect
      if (this.constructor.name.endsWith("Parser")) {
        this.eventName = this.constructor.name
          .slice(0, this.constructor.name.length - "Parser".length)
          .toLowerCase();
      } else {
        this.eventName = this.constructor.name.toLowerCase();
      }
    }
  }

  match(data): boolean {
    throw new Error("Missing match(data) implementation");
  }

  parse(data): T {
    throw new Error("Missing parse(data) implementation");
  }
}
