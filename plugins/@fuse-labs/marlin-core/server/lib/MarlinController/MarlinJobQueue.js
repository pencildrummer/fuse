import { EventEmitter } from 'events'
import MarlinGCodeJob from "./MarlinGCodeJob.js"

/**
 * MarlinJobQueue
 */
export default class MarlinJobQueue extends EventEmitter {

  /** All the jobs */
  #jobs = []

  /** If the queue should pause before sending the next job after a the previous one is finished */
  waitBetweenJobs = false

  /** Current running job */
  /** @type {MarlinGCodeJob} */
  #currentJob
  get currentJob() { return this.#currentJob }

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
      // If wait between jobs, then do not automatically start next job
      if (this.waitBetweenJobs) return
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
      
      let jobNextHandler = _ => {
        let eventJob = this.currentJob
        process.nextTick(_ => this.emit('job:progress', eventJob))
      }

      let jobFinishHandler = _ => {
        this.#currentJob.off('next', jobNextHandler)
        this.#currentJob.off('finish', jobFinishHandler)
        let eventJob = this.currentJob
        process.nextTick(_ => this.emit('job:finish', eventJob))
        this.#currentJob = null
      }

      this.#currentJob.on('next', jobNextHandler)
      this.#currentJob.on('finish', jobFinishHandler)
      
      // Start job
      this.#currentJob.start()
      let eventJob = this.currentJob
      process.nextTick(_ => this.emit('job:start', eventJob))

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