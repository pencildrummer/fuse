import { generateUniqueID } from '@fuse-labs/core';

const LineEnding = Object.freeze({
  None: 0,
  CarriageReturn: 1,
  NewLine: 2,
  CarriageReturnAndNewLine: 3
})

export class Terminal {
  
  /**
   * Socket
   */
  _socket;

  _isOpen = false;
  get isOpen() {
    return this._isOpen
  }
  
  deviceId

  lineEnding = LineEnding.NewLine  
  useCarriageReturn = false

  constructor(device, { autoConnect = true } = {}) {
    console.log('Creating terminal for device ID', device.id)
    this.deviceId = device.id
    // Init socket to pass messages to backend
    this._socket = device.sockets.fuseLabs.marlinTerminal

    // DEBUG
    this.onMessageReceived(data => {
      console.log('Received data', data)
    })
    
    // Automatically connect on creation
    if (autoConnect) {
      this.connect()
    }
  }

  connect(onConnect) {
    this._socket.emit('open', this.deviceId, open => {
      console.log('Callback on connect, result:', open)
      this._isOpen = open
      if (open) onConnect?.(open)
    })
  }

  disconnect() {
    this._socket.emit('close', this.deviceId)
  }

  sendMessage(message) {
    console.log('Sending message:', message)
    let data = {
      id: generateUniqueID(),
      message: this.formatMessage(message),
      from: 'user',
      deviceId: this.deviceId
    }
    this._socket.emit('message', data)
    return data
  }

  onMessageReceived(listener) {
    this._socket.on('message', listener)
  }

  offMessageReceived(listener) {
    this._socket.off('message', listener)
  }

  // Internal
  formatMessage(message) {
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