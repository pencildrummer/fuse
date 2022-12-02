import path from "path";
import { Controller, logger } from "@fuse-labs/core";
import MarlinReadyParser from "./MarlinReadyParser.js";
import MarlinLineParser from "./MarlinLineParser.js";
import parser from "gcode-parser";
import MarlinGCodeJob from "./MarlinGCodeJob.js";
import TemperatureParser from "./data-parser/TemperatureParser.js";
import OkParser from "./data-parser/OkParser.js";
import MarlinJobQueue from "./MarlinJobQueue.js";

// Keep here in case we need it later
// const LineEnding = Object.freeze({
//   None: 0,
//   CarriageReturn: 1,
//   NewLine: 2,
//   CarriageReturnAndNewLine: 3
// })

export default class MarlinController extends Controller {
  private _isReady = false;

  // TODO - Create queue?
  private _job = null;

  private queue: MarlinJobQueue;

  // TODO - Check if should we use serialport parser, or leave this as a Fuse internal parser thing or even for MarlinController
  private _parsers = [new OkParser(), new TemperatureParser()];

  constructor(device) {
    super(device);

    // Create job queue
    this.#initQueue();

    // Attach readyParser and then pipe readline parser to readyParser
    let readyParser = this.device.connection.addParser(new MarlinReadyParser());
    readyParser.on("ready", (_) => {
      this._isReady = true;
      logger
        .child({ scope: this.constructor.name })
        .success("Marlin device is ready");
      this.emit("ready");
    });

    // Add Marlin parser on connection
    let lineParser = readyParser.pipe(new MarlinLineParser());
    lineParser.on("data", (data) => this.handleParsedData(data));

    // On close connection
    let closeHandler = (_) => {
      // Clear pending job
      this.queue.clear();
      this.device.connection.off("close", closeHandler);
    };

    this.device.connection.on("close", closeHandler);
  }

  /**
   * Return the jobs in the queue
   */
  get jobs() {
    return this.queue.jobs;
  }

  startJob(jobID) {
    console.log("TODO - start job in MarlinController");
  }

  resumeJob(jobID) {
    console.log("TODO - resume job in MarlinController");
  }

  pauseJob(jobID) {
    console.log("TODO - pause job in MarlinController");
  }

  stopJob(jobID) {
    console.log("TODO - stop job in MarlinController");
  }

  /**
   * Helper method to write to connection. This is the same as calling device.connection.write(data)
   * With this you can write any type of data and you are in charge for any formatting (eg: line endings in text, ...)
   * @param {*} data
   */
  write(data) {
    if (!this.device.connection.isOpen) {
      let error = new Error("Unable to write data, connection not open");
      this.emit("error", error);
      console.error(error);
    } else {
      this.emit("write", data);
      this.device.connection.write(data); //, { encoding: 'latin1' }
    }
  }

  /**
   * Helper method to send GCode commands. Do not append line endings, it will be appended automatically.
   * @param {string} command
   */
  sendCommand(command: string) {
    if (typeof command !== "string")
      throw new Error("command must be of type string, got" + typeof command);

    // Auto append \n
    this.write(command + "\n");
  }

  sendGCodeFile(filePath: string) {
    // Parse GCODE
    logger.pending("Parsing file", filePath);
    let lines = parser.parseFileSync(filePath);
    // TODO - Validate result
    logger.complete("Parsing completed - tot lines:", lines.length);

    // Create new job
    let job = new MarlinGCodeJob(path.basename(filePath), this, lines);

    // Push job onto the queue
    this.queue.addJob(job);

    // Start queue if not running?
    this.queue.start();
  }

  /**
   * Private
   */

  handleParsedData(data) {
    logger.scope(this.constructor.name).info("Received data:", data);
    // Notify data received
    this.emit("data", data);

    // Check and perform parsers
    this._parsers.forEach((parser) => {
      if (parser.match(data)) {
        let parsedData = parser.parse(data, this);
        // Controller emit a data:* event with the parsed data
        this.emit("data:" + parser.eventName, parsedData);
        // TODO - Check if there is a better place
        this.device.namespace.emit("data:" + parser.eventName, parsedData);
      }
    });
  }

  private initQueue() {
    this.queue = new MarlinJobQueue();
    this.queue.on("start", (_) => logger.start("Queue started"));
    this.queue.on("finish", (_) => logger.complete("Queue finished"));
    this.queue.on("job:start", (job) => {
      this.device.namespace.emit("job:start", job);
    });
    this.queue.on("job:progress", (job) => {
      this.device.namespace.emit("job:progress", job);
    });
    this.queue.on("job:pause", (job) => {
      console.log("PAUSEEEED JOB");
      this.device.namespace.emit("job:pause", job);
    });
    this.queue.on("job:resume", (job) => {
      this.device.namespace.emit("job:resume", job);
    });
    this.queue.on("job:finish", (job) => {
      this.device.namespace.emit("job:finish", job);
    });
    this.queue.on("job:added", (job) => {
      this.device.namespace.emit("job:added", job);
    });
    this.queue.on("job:removed", (job) => {
      this.device.namespace.emit("job:removed", job);
    });
  }
}
