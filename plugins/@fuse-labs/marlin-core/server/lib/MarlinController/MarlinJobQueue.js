import { EventEmitter } from 'events'
import MarlinGCodeJob from "./MarlinGCodeJob.js"

/**
 * MarlinJobQueue
 */
export default class MarlinJobQueue extends EventEmitter {

  /** All the jobs */
  #jobs = []

  /** Current running job */
  /** @type {MarlinGCodeJob} */
  #currentJob

  /** Maximum allowed number of jobs in the queue */
  maxJobs = 1

  #isRunning = false
  get isRunning() { return this.#isRunning }

  #isPaused = false
  get isPaused() { return this.#isPaused }

  constructor() {
    super()
    // Add listeners
    this.on('job:finish', _ => {
      // Start next job
      this.#next()
    })
  }

  addJob(job) {
    this.#jobs.push(job)
    this.emit('job:added', job)
  }

  removeJob(job) {
    this._jobs = this.#jobs.filter(j => j.id !== job.id)
    this.emit('job:removed', job)
  }

  start() {
    // Skip if already running
    if (this.#isRunning) {
      console.info('Requested queue start but queue is already running')
      return
    }
    // Get next job if any
    let job = this.#next()
    if (job) {
      this.#isRunning = true
      this.emit('start')
    }
  }

  pause() {
    // TODO
    //this.#isPaused = true
    //this.#currentJob.pause()
  }

  resume() {
    // TODO
    //this.#isPaused = false
  }

  /** Private */

  #next() {
    // Get first job, queue if FIFO
    let job = this.#jobs.shift()
    if (job) {
      this.#currentJob = job
      
      this.#currentJob.on('finish', _ => {
        let finishedJob = this.#currentJob
        this.#currentJob = null
        this.emit('job:finish', finishedJob)
      })
      
      // Start job
      this.#currentJob.start()
      this.emit('job:start', this.#currentJob)

      // Return started job
      return job
    } else {
      console.warn('No more jobs on queue to start, sending finish trigger')
      this.#finish()
    }
  }

  #finish() {
    this.#isRunning = false
    this.#isPaused = false
    this.emit('finish')
  }

}