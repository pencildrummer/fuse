import { EventEmitter } from "events";
/**
 * Base class to be subclassed by different device connection types.
 * It extends the EventEmitter and every subclass must implement data, read, write, open and close handlers
 */
export default class Connection extends EventEmitter {
    /** Return if current connection is open */
    get isOpen() {
        throw new Error("isOpen getter not implemented on " + this.constructor.name);
    }
    /**
     * Open connection to device
     */
    open(callback) {
        throw new Error("open() not implemented on " + this.constructor.name);
    }
    /**
     * Close connection to device
     */
    close(callback) {
        throw new Error("close() not implemented on " + this.constructor.name);
    }
    /**
     * Write data to device
     */
    write(data, opts) {
        throw new Error("write() not implemented on " + this.constructor.name);
    }
    /**
     * Add parser to the connection to parse incoming data
     * @param {Parser} parser
     */
    addParser(parser) {
        throw new Error("addParser() not implemented on" + this.constructor.name);
    }
}
