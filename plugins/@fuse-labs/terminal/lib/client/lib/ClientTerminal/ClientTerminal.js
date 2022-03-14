import { generateUniqueID } from '@fuse-labs/shared-utils';

const LineEnding = Object.freeze({
  None: 0,
  CarriageReturn: 1,
  NewLine: 2,
  CarriageReturnAndNewLine: 3
})

export default class ClientTerminal {
  
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

  /**
   * Contains latest received data. Limited to 30 latest messages.
   */
  _log = []
  get log() { return this._log }

  constructor(device, { autoConnect = true } = {}) {
    console.log('Creating terminal for device ID', device.id)
    this.deviceId = device.id
    // Init socket to pass messages to backend
    this._socket = device.sockets.fuseLabs.terminal

    if (!this._socket) {
      console.log(device)
      throw new Error('Missing terminal socket for device')
    }

    // Add data listener to be internally loggeed
    this.onMessageReceived(data => {
      //console.log('Received data, adding to log', data)
      this._log.push(data)
      if (this._log.length > 30)
        this._log.shift()
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
      message: this._formatMessage(message),
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

  /**
   * Log
   */

  clearLog() {
    this._log = []
  }

  /** PRIVATE */

  _formatMessage(message) {
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