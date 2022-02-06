import socket from 'lib/client/socket';
import { Socket } from 'socket.io-client'
import { Event } from '../types/events.ts';

export class Terminal {
  
  _socket: Socket;

  constructor() {
    this._socket = socket()
    this._socket.on('connection', _ => {
      console.log('Connected')
    })
  }

  sendMessage(message: String) {
    this._socket.emit(Event.Message, message)
  }

  onMessageReceived(listener: ([...args]: [any]) => void) {
    this._socket.on(Event.Message, listener)
  }

  offMessageReceived(listener: ([...args]: [any]) => void) {
    this._socket.off(Event.Message, listener)
  }
}

export default new Terminal()