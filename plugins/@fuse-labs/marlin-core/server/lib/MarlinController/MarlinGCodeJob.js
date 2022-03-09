import { EventEmitter } from 'events'

export default class MarlinGCodeJob extends EventEmitter {

  _controller
  _lines

  _cursor = -1

  _running = false;
  get running() { return this._running }

  constructor(controller, lines) {
    super()
    
    this._controller = controller
    this._lines = lines

    // Configure internal listener
    this.on('next', this._handleNext.bind(this))
  }

  start() {
    if (this._running) return
    
    console.start('Started job')

    // Set running flag
    this._running = true
    
    // Add listener on controller
    let okHandler = _ => {
      // 'ok' has been received from latest command (can we have a ref to the command sent?)
      this.emit('next')
    }
    this._controller.on('data:ok', okHandler)
    this.on('finish', _ => {
      this._controller.off('data:ok', okHandler)
    })

    // Send start event
    this.emit('start')

    // Send next event to process next command (first one on start)
    this.emit('next')
  }

  finish() {
    console.complete('Finished job')
    // Set running flag as false
    this._running = false

    // Send finish event
    this.emit('finish')
  }

  /**
   * Private
   */
  
  _handleNext() {
    this._cursor++
    if (this._lines.length > 0) {
      // Get line to perform command
      let line = this._lines.shift()

      // Analyze line and decide how to handle parameters
      // Get command string
      let command = line.line

      // TODO - Check if should be done or not
      // Check if comment
      if (command.trim().startsWith(';')) {
        // Send next event to process next command
        this.emit('next')
      } else {
        // Send command
        this._controller.sendCommand(command)
      }
    } else {
      // No more commands, finish job
      this.finish()
    }
  }

}