import { generateUniqueID } from '@fuse-labs/shared-utils'
import { EventEmitter } from 'events'

/**
 * MarlingGCodeJob
 */
export default class MarlinGCodeJob extends EventEmitter {

  #id
  get id() { return this.#id }

  #name
  get name() { return this.#name }

  #startedAt
  get startedAt() { return this.#startedAt }

  #controller
  #lines
  #linesCount

  #cursor = -1

  #running = false;
  get running() { return this.#running }

  #paused = false;
  get paused() { return this.#paused }

  get progress() {
    return {
      current: this.#cursor,
      total: this.#linesCount
    }
  }

  constructor(name, controller, lines) {
    super()
    
    this.#id = generateUniqueID()
    this.#name = name

    this.#controller = controller
    this.#lines = lines
    this.#linesCount = lines.length

    // Configure internal listener
    this.on('next', this.#handleNext.bind(this))
  }

  start() {
    if (this.#paused) {
      return console.warn('Trying to start a paused job. Call resume() instead.')
    }

    if (this.#running) {
      return console.warn('Trying to start an already running job.')
    }
    
    console.start('Started job')

    // Set running flag
    this.#running = true
    
    // Set start date
    this.#startedAt = new Date()
    
    // Add listener on controller
    let okHandler = _ => {
      if (!this.#running) return
      // 'ok' has been received from latest command (can we have a ref to the command sent?)
      process.nextTick(_ => this.emit('next', this))
    }
    this.#controller.on('data:ok', okHandler)
    this.on('finish', _ => {
      this.#controller.off('data:ok', okHandler)
    })

    let errorHandler = _ => {
      console.log('Controller error received on MarlinGCodeJob')
      // Pause job automatically
      this.pause()
    }
    this.#controller.on('error', errorHandler)
    this.on('finish', _ => {
      this.#controller.off('error', errorHandler)
    })

    // Start job
    process.nextTick(_ => {
      // Send start event
      this.emit('start', this)

      // Send next event to process next command (first one on start)
      this.emit('next', this)
    })
  }

  pause() {
    if (!this.running) {
      return console.warn('Trying to pause a job not running')
    }

    console.note('Pausing job')

    this.#running = false
    
    process.nextTick(_ => this.emit('pause', this))
  }

  resume() {
    if (!this.paused) {
      return console.warn('Trying to resume a job not paused')
    }

    if (this.running) {
      return console.warn('Trying to resume an already running job')
    }

    // Set paused and running flag
    this.#paused = false
    this.#running = true

    // Resume job
    process.nextTick(_ => {
      this.emit('resume', this)
      this.emit('next', this)
    })
  }

  finish() {
    console.complete('Finished job')
    // Set running flag as false
    this.#running = false

    // Send finish event (in the next tick to allow running flag to be set)
    process.nextTick(_ => this.emit('finish', this))
  }

  /**
   * Private
   */
  
  #handleNext() {
    if (this.#running && this.#lines.length > 0) {

      // Incremente cursor
      this.#cursor++

      // Get line to perform command
      let line = this.#lines.shift()

      // Analyze line and decide how to handle parameters
      // Get command string
      let command = line.line

      // TODO - Check if should be done or not
      // Check if comment
      if (command.trim().startsWith(';')) {
        // Send next event to process next command
        process.nextTick(_ => this.emit('next', this))
      } else {
        // Send command
        this.#controller.sendCommand(command)
      }
    } else {
      // No more commands, finish job
      this.finish()
    }
  }

  /** toJSON */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      startedAt: this.startedAt,
      progress: this.progress,
      running: this.running,
      paused: this.paused,
    }
  }

}