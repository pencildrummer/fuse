import { EventEmitter } from "events";
import MarlinGCodeJob from "./MarlinGCodeJob.js";

/**
 * MarlinJobQueue
 */
export default class MarlinJobQueue extends EventEmitter {
  /** All the jobs */
  private _jobs: MarlinGCodeJob[] = [];
  get jobs() {
    return this._jobs;
  }

  /** If the queue should pause before sending the next job after a the previous one is finished */
  waitBetweenJobs = false;

  /** Current running job */
  private _currentJob: MarlinGCodeJob;
  get currentJob() {
    return this._currentJob;
  }

  /** Maximum allowed number of jobs in the queue */
  maxJobs = 1;

  private _isRunning = false;
  get isRunning() {
    return this._isRunning;
  }

  private _isPaused = false;
  get isPaused() {
    return this._isPaused;
  }

  constructor() {
    super();
    // Add listeners
    this.on("job:finish", () => {
      // If wait between jobs, then do not automatically start next job
      if (this.waitBetweenJobs) return;
      // Start next job
      this.next();
    });
  }

  addJob(job) {
    this._jobs.push(job);
    this.emit("job:added", job);
  }

  removeJob(job) {
    this._jobs = this._jobs.filter((j) => j.id !== job.id);
    this.emit("job:removed", job);
  }

  start() {
    // Skip if already running
    if (this._isRunning) {
      console.info("Requested queue start but queue is already running");
      return;
    }
    // Get next job if any
    let job = this.next();
    if (job) {
      this._isRunning = true;
      this.emit("start");
    }
  }

  pause() {
    // TODO
    //this._isPaused = true
    //this._currentJob.pause()
  }

  resume() {
    // TODO
    //this._isPaused = false
  }

  /**
   * Remove all jobs. If any job is running, stops immediately.
   */
  clear() {
    this._currentJob?.finish();
    this._jobs.forEach((job) => this.removeJob(job));
    this.finish();
  }

  /** Private */

  private next() {
    // Get first job, queue if FIFO
    let job = this._jobs.shift();
    if (job) {
      this._currentJob = job;

      let jobStartHandler = (j) => {
        console.log("Queue job start handler", j);
        process.nextTick(() => this.emit("job:start", j));
      };

      let jobNextHandler = (j) => {
        process.nextTick(() => this.emit("job:progress", j));
      };

      let jobPauseHandler = (j) => {
        console.log("Queue PAUSE job handler", j);
        process.nextTick(() => this.emit("job:pause", j));
      };

      let jobResumeHandler = (j) => {
        console.log("Queue RESUME job handler", j);
        process.nextTick(() => this.emit("job:resume", j));
      };

      let jobFinishHandler = (j) => {
        // Remove job listeners
        this._currentJob.off("start", jobStartHandler);
        this._currentJob.off("pause", jobPauseHandler);
        this._currentJob.off("resume", jobResumeHandler);
        this._currentJob.on("next", jobNextHandler);
        this._currentJob.on("finish", jobFinishHandler);
        // Send queue job:finish event
        process.nextTick(() => this.emit("job:finish", j));
        // TODO - Remove job? instead of clearing current job?
        this._currentJob = null;
      };

      this._currentJob.on("start", jobStartHandler);
      this._currentJob.on("pause", jobPauseHandler);
      this._currentJob.on("resume", jobResumeHandler);
      this._currentJob.on("next", jobNextHandler);
      this._currentJob.on("finish", jobFinishHandler);

      // Start job
      this._currentJob.start();
      let eventJob = this.currentJob;
      process.nextTick(() => this.emit("job:start", eventJob));

      // Return started job
      return job;
    } else {
      console.warn("No more jobs on queue to start, sending finish trigger");
      this.finish();
    }
  }

  private finish() {
    this._isRunning = false;
    this._isPaused = false;
    this.emit("finish");
  }
}
