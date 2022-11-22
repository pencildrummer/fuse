/// <reference types="node" />
import { EventEmitter } from "events";
import { Connection as CoreConnection } from "@fuse-labs/types";
/**
 * Base class to be subclassed by different device connection types.
 * It extends the EventEmitter and every subclass must implement data, read, write, open and close handlers
 */
export default class Connection extends EventEmitter implements CoreConnection.Interface {
    /** Return if current connection is open */
    get isOpen(): boolean;
    /**
     * Open connection to device
     */
    open(callback: any): void;
    /**
     * Close connection to device
     */
    close(callback: any): void;
    /**
     * Write data to device
     */
    write(data: any, opts: any): void;
    /**
     * Add parser to the connection to parse incoming data
     * @param {Parser} parser
     */
    addParser(parser: any): void;
}
//# sourceMappingURL=Connection.d.ts.map