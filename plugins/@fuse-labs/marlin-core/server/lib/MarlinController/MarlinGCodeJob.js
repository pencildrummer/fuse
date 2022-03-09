import { EventEmitter } from 'events'

export default class MarlinGCodeJob extends EventEmitter {

  _controller
  _lines

  _cursor = -1

  _running = false;

  constructor(controller, lines) {
    super()
    
    this._controller = controller
    this._lines = lines

    // Configure internal listener
    this.on('next', _ => this._handleNext())
    this.on('finish', _ => this._handleFinish())

    // Add listener on controller
    this._controller.on('data:ok', data => this._handleOk(data))
  }

  start() {
    this._running = true
    this.emit('next')
  }

  /**
   * Private
   */
  
  _handleNext() {
    this._cursor++
    if (this._lines.length > 0) {
      // Get line to perform command
      let line = this._lines.shift()
      console.debug('LINE', line)
      console.info('New length', this._lines.length)
      // Analyze line and decide how to handle parameters
      // Get command string
      let command = line.line
      console.debug('COMMAND', command)
      // TODO - Check if should be done or not
      // Check if comment
      if (command.trim().startsWith(';')) {
        this.emit('next')
      } else {
        // Send command
        this._controller.sendCommand(command)
      }
    } else {
      // No more commands
      this.emit('finish')
    }
  }

  _handleOk(data) {
    console.info('OK received as response, performing next command')
    // 'ok' has been received from latest command (can we have a ref to the command sent?)
    this.emit('next')
  }

  _handleFinish() {
    console.complete('Finished MarlinGCodeJob')
    this._running = false
  }

}