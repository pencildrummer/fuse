import { generateUniqueID } from '@fuse-labs/shared-utils'
import { randomUUID } from 'crypto'
import { EventEmitter } from 'events'

/**
 * MarlingGCodeJob
 */
export default class MarlinGCodeJob extends EventEmitter {

  #id
  get id() { return this.#id }

  #name
  get name() { return this.#name }

  #startedAt
  get startedAt() { return this.#startedAt }

  #controller
  #lines
  #linesCount

  #cursor = -1

  #running = false;
  get running() { return this.#running }

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
    if (this.#running) return
    
    console.start('Started job')

    // Set running flag
    this.#running = true
    // Set start date
    this.#startedAt = new Date()
    
    // Add listener on controller
    let okHandler = _ => {
      if (!this.#running) return
      // 'ok' has been received from latest command (can we have a ref to the command sent?)
      process.nextTick(_ => this.emit('next'))
    }
    this.#controller.on('data:ok', okHandler)
    this.on('finish', _ => {
      this.#controller.off('data:ok', okHandler)
    })

    process.nextTick(_ => {
      // Send start event
      this.emit('start')

      // Send next event to process next command (first one on start)
      this.emit('next')
    })
  }

  finish() {
    console.complete('Finished job')
    // Set running flag as false
    this.#running = false

    // Send finish event (in the next tick to allow running flag to be set)
    process.nextTick(_ => this.emit('finish'))
  }

  /**
   * Private
   */
  
  #handleNext() {
    this.#cursor++
    if (this.#lines.length > 0) {
      // Get line to perform command
      let line = this.#lines.shift()

      // Analyze line and decide how to handle parameters
      // Get command string
      let command = line.line

      // TODO - Check if should be done or not
      // Check if comment
      if (command.trim().startsWith(';')) {
        // Send next event to process next command
        process.nextTick(_ => this.emit('next'))
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
      progress: this.progress
    }
  }

}