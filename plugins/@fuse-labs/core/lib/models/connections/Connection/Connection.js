import { EventEmitter } from 'events'

/**
 * Base class to be subclassed by different device connection types.
 * It extends the EventEmitter and every subclass must implement data, read, write, open and close handlers
 */
export default class Connection extends EventEmitter {

  /** Return if current connection is open */
  isOpen = false

  /**
   * Open connection to device
   */
  open() {
    throw new Error('open() not implemented on ', this.constructor.name)
  }

  /**
   * Close connection to device
   */
  close() {
    throw new Error('close() not implemented on ', this.constructor.name)
  }

  /**
   * Write data to device
   */
  write(data) {
    throw new Error('write() not implemented on ', this.constructor.name)
  }

  /**
   * Add parser to the connection to parse incoming data
   * @param {Parser} parser 
   */
  addParser(parser) {
    throw new Error('addParser() not implemented on', this.constructor.name)
  }

}