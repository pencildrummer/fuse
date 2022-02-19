import socket from 'lib/client/socket';
import { generateUniqueID } from 'lib/shared/uuid';
import { Socket } from 'socket.io-client'
import { Event } from '../types/events.ts';

enum LineEnding {
  None = 0,
  CarriageReturn = 1,
  NewLine = 2,
  CarriageReturnAndNewLine = 3
}

export class Terminal {
  
  _socket: Socket;

  private _isOpen: Boolean = false;
  public get isOpen() : Boolean {
    return this._isOpen
  }
  
  device

  lineEnding: LineEnding = LineEnding.NewLine  
  useCarriageReturn: Boolean = false

  constructor(device, { autoConnect = true } = {}) {
    this.device = device
    // Init socket to pass messages to backend
    this._socket = socket

    // Automatically connect on creation
    if (autoConnect) {
      this.connect()
    }
  }

  connect(onConnect: () => void = null) {
    this._socket.emit('@fuse-labs.terminal.connect', this.device.id, open => {
      console.log('Callback on connect, result:', open)
      this._isOpen = open
      if (open) onConnect?.()
    })
  }

  disconnect() {
    this._socket.emit('@fuse-labs.terminal.disconnect', this.device.id)
  }

  sendMessage(message: string) {
    let data = {
      id: generateUniqueID(),
      message: this.formatMessage(message),
      from: 'user',
      deviceId: this.device.id
    }
    this._socket.emit(Event.Message, data)
    return data
  }

  onMessageReceived(listener: ([...args]: [any]) => void) {
    this._socket.on(Event.Message, listener)
  }

  offMessageReceived(listener: ([...args]: [any]) => void) {
    this._socket.off(Event.Message, listener)
  }

  // Internal
  formatMessage(message: string): string {
    switch (this.lineEnding) {
      case LineEnding.NewLine:                  
        return message.trim() + '\n'
      case LineEnding.CarriageReturn:           
        return message.trim() + '\r'
      case LineEnding.CarriageReturnAndNewLine: 
        return message.trim() + '\r\n'
      case LineEnding.None:
      default:
        return message.trim()
    }
  }
}