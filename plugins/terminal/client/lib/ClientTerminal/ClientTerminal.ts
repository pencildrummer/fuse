import { generateUniqueID } from "@fuse-labs/shared-utils";
import { ClientDevice } from "@fuse-labs/core-client";

type LineEnding =
  | "none"
  | "carriageReturn"
  | "newLine"
  | "carriageReturnAndNewLine";

export default class ClientTerminal {
  /**
   * Socket
   */
  _socket;

  _isOpen = false;
  get isOpen() {
    return this._isOpen;
  }

  deviceId;

  lineEnding: LineEnding = "newLine";
  useCarriageReturn = false;

  /**
   * Contains latest received data. Limited to 30 latest messages.
   */
  _log = [];
  get log() {
    return this._log;
  }

  constructor(device: ClientDevice, { autoConnect = true } = {}) {
    console.log("Creating terminal for device ID", device.id);

    this.deviceId = device.id;

    // Init socket to pass messages to backend
    this._socket = device.pluginSockets?.fuseLabs?.terminal;

    if (!this._socket) {
      console.log(device);
      throw new Error("Missing terminal socket for device");
    }

    // Add data listener to be internally loggeed
    this.onMessageReceived((data) => {
      //console.log('Received data, adding to log', data)
      this._log.push(data);
      if (this._log.length > 30) this._log.shift();
    });

    // Automatically connect on creation
    if (autoConnect) {
      this.connect();
    }
  }

  connect(onConnect?) {
    this._socket.emit("open", this.deviceId, (open) => {
      console.log("Callback on connect, result:", open);
      this._isOpen = open;
      if (open) onConnect?.(open);
    });
  }

  disconnect() {
    this._socket.emit("close", this.deviceId);
  }

  sendMessage(message) {
    console.log("Sending message:", message);
    let data = {
      id: generateUniqueID(),
      message: this._formatMessage(message),
      from: "user",
      deviceId: this.deviceId,
    };
    this._socket.emit("message", data);
    return data;
  }

  onMessageReceived(listener) {
    this._socket.on("message", listener);
  }

  offMessageReceived(listener) {
    this._socket.off("message", listener);
  }

  /**
   * Log
   */

  clearLog() {
    this._log = [];
  }

  /** PRIVATE */

  _formatMessage(message) {
    switch (this.lineEnding) {
      case "newLine":
        return message.trim() + "\n";
      case "carriageReturn":
        return message.trim() + "\r";
      case "carriageReturnAndNewLine":
        return message.trim() + "\r\n";
      case "none":
      default:
        return message.trim();
    }
  }
}
