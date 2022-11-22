import chalk from "chalk";
import { SerialPort } from "serialport";
import signale from "signale";
import Connection from "../Connection/Connection.js";

// SerialPort doe not export ErrorCallback error workaround
type ErrorCallback = (err: Error | null) => void;

export default class SerialConnection extends Connection {
  private baudRate: number;
  private opts: any;

  private _serialPort: SerialPort;
  private get serialPort() {
    if (!this._serialPort) {
      throw new Error(
        "Trying to access device missing serialPort. Probably the device is not connected and so the serial port is not present on the host. We should improved this error handling behaviour."
      );
    }
    return this._serialPort;
  }
  constructor(
    portPath: string,
    baudRate: number,
    opts?: any,
    callback?: ErrorCallback
  ) {
    super();
    try {
      this.baudRate = baudRate;
      this.opts = opts;
      this.initSerialPort(portPath, callback);
    } catch (error) {
      signale.error(
        `Error creating serial connection on port ${chalk.bold(
          `${portPath}@${baudRate}`
        )}`
      );
      signale.error(error);
    }
  }

  get isOpen() {
    return this.serialPort.isOpen;
  }

  /**
   * Change current baud rate
   * @param {number} baudRate
   */
  setBaudRate(baudRate: number, callback?: ErrorCallback) {
    this.serialPort.update(
      {
        baudRate: baudRate,
      },
      callback
    );
  }

  open(callback?: ErrorCallback) {
    this.serialPort.open(callback);
  }

  close(callback?: ErrorCallback) {
    if (this.serialPort.isOpen) this._serialPort.close(callback);
  }

  write(data: any, opts: any) {
    let hasDrained = this.serialPort.write(data, opts);
  }

  addParser(parser) {
    return this.serialPort.pipe(parser);
  }

  /**
   * Private
   */

  initSerialPort(portPath: string, callback?: ErrorCallback) {
    this._serialPort = new SerialPort(
      {
        path: portPath,
        baudRate: this.baudRate,
        dataBits: 8,
        parity: "none",
        stopBits: 1,
        rtscts: false,
        ...this.opts,
        autoOpen: false, // Force auto open to false for now
      },
      callback
    );

    // Attach open and error serial port listener for debugging
    this._serialPort.on("open", (args) => {
      signale
        .scope(this.constructor.name)
        .note("Opened port ", portPath, "@", this.baudRate);
      this.emit("open", args);
    });

    this._serialPort.on("close", (args) => {
      signale
        .scope(this.constructor.name)
        .info("Closed serial connection on port", portPath, "@", this.baudRate);
      this.emit("close", args);
    });

    this._serialPort.on("error", (err) => {
      signale
        .scope(this.constructor.name)
        .error("Error on port path", portPath, "@", this.baudRate);
      signale.scope(this.constructor.name).error(err);
      this.emit("error", err);
    });

    this._serialPort.on("data", (rawData) => {
      //signale.scope(this.constructor.name).info('Received data on SerialConnection:', rawData)
      this.emit("data", rawData);
    });
  }
}
