export default class MarlinJobQueue {

  _device

  _jobs = []

  constructor(device) {
    // Validate device not empty
    this._device = device
  }

  addJob(job) {
    this._jobs.push(job)
  }

}