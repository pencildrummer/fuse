import Connection from "../Connection/Connection.js";
type ErrorCallback = (err: Error | null) => void;
export default class SerialConnection extends Connection {
    private baudRate;
    private opts;
    private _serialPort;
    constructor(portPath: string, baudRate: number, opts?: any, callback?: ErrorCallback);
    get isOpen(): boolean;
    /**
     * Change current baud rate
     * @param {number} baudRate
     */
    setBaudRate(baudRate: number, callback?: ErrorCallback): void;
    open(callback?: ErrorCallback): void;
    close(callback?: ErrorCallback): void;
    write(data: any, opts: any): void;
    addParser(parser: any): any;
    /**
     * Private
     */
    initSerialPort(portPath: string, callback?: ErrorCallback): void;
}
export {};
//# sourceMappingURL=SerialConnection.d.ts.map