import { EventEmitter } from "events";
import { Connection as CoreConnection } from "@fuse-labs/types";

// SerialPort doe not export ErrorCallback error workaround
export type ErrorCallback = (err: Error | null) => void;

/**
 * Base class to be subclassed by different device connection types.
 * It extends the EventEmitter and every subclass must implement data, read, write, open and close handlers
 */
export default class Connection
  extends EventEmitter
  implements CoreConnection.Interface
{
  /** Return if current connection is open */
  get isOpen(): boolean {
    throw new Error(
      "isOpen getter not implemented on " + this.constructor.name
    );
  }

  /**
   * Open connection to device
   */
  open(callback: ErrorCallback) {
    throw new Error("open() not implemented on " + this.constructor.name);
  }

  /**
   * Close connection to device
   */
  close(callback: ErrorCallback) {
    throw new Error("close() not implemented on " + this.constructor.name);
  }

  /**
   * Write data to device
   */
  write(data: any, opts?: any) {
    throw new Error("write() not implemented on " + this.constructor.name);
  }

  /**
   * Add parser to the connection to parse incoming data
   * @param {Parser} parser
   */
  addParser(parser: any): any {
    throw new Error("addParser() not implemented on" + this.constructor.name);
  }
}
