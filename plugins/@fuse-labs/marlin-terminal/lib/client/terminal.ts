import socket from 'lib/client/socket';
import { Socket } from 'socket.io-client'
import { Event } from '../types/events.ts';

export class Terminal {
  
  _socket: Socket;

  constructor() {
    this._socket = socket
    this._socket.on('connection', _ => {
      console.log('Connected')
    })
  }

  sendMessage(message: String) {
    let data = {
      id: this.generateUniqueID(),
      message,
      from: 'user'
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

  // Private

  generateUniqueID() {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}

export default new Terminal()