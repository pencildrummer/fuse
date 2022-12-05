import { Controller, logger } from "@fuse-labs/core";
import { generateUniqueID } from "@fuse-labs/shared-utils";
import { EventEmitter } from "events";
import MarlinController, { GCodeParsedLine } from "./MarlinController.js";

/**
 * MarlingGCodeJob
 */
export default class MarlinGCodeJob extends EventEmitter {
  readonly id: string;
  readonly name: string;

  private _startedAt: Date;
  get startedAt() {
    return this._startedAt;
  }

  readonly controller: MarlinController;
  readonly lines: GCodeParsedLine[];
  readonly linesCount: number;

  private _running = false;
  get running() {
    return this._running;
  }

  private _paused = false;
  get paused() {
    return this._paused;
  }

  private cursor = -1;

  get progress() {
    return {
      current: this.cursor,
      total: this.linesCount,
    };
  }

  constructor(
    name: string,
    controller: MarlinController,
    lines: GCodeParsedLine[]
  ) {
    super();

    this.id = generateUniqueID();
    this.name = name;

    this.controller = controller;
    this.lines = lines;
    this.linesCount = lines.length;

    // Configure internal listener
    this.on("next", this.handleNext.bind(this));
  }

  start() {
    if (this.paused) {
      return console.warn(
        "Trying to start a paused job. Call resume() instead."
      );
    }

    if (this.running) {
      return console.warn("Trying to start an already running job.");
    }

    logger.start("Started job");

    // Set running flag
    this._running = true;

    // Set start date
    this._startedAt = new Date();

    // Add listener on controller
    let okHandler = () => {
      if (!this.running) return;
      // 'ok' has been received from latest command (can we have a ref to the command sent?)
      process.nextTick(() => this.emit("next", this));
    };
    this.controller.on("data:ok", okHandler);
    this.on("finish", () => {
      this.controller.off("data:ok", okHandler);
    });

    let errorHandler = () => {
      console.log("Controller error received on MarlinGCodeJob");
      // Pause job automatically
      this.pause();
    };
    this.controller.on("error", errorHandler);
    this.on("finish", () => {
      this.controller.off("error", errorHandler);
    });

    // Start job
    process.nextTick(() => {
      // Send start event
      this.emit("start", this);

      // Send next event to process next command (first one on start)
      this.emit("next", this);
    });
  }

  pause() {
    if (!this.running) {
      return console.warn("Trying to pause a job not running");
    }

    logger.info("Pausing job");

    this._running = false;

    process.nextTick(() => this.emit("pause", this));
  }

  resume() {
    if (!this.paused) {
      return console.warn("Trying to resume a job not paused");
    }

    if (this.running) {
      return console.warn("Trying to resume an already running job");
    }

    // Set paused and running flag
    this._paused = false;
    this._running = true;

    // Resume job
    process.nextTick(() => {
      this.emit("resume", this);
      this.emit("next", this);
    });
  }

  finish() {
    logger.complete("Finished job");
    // Set running flag as false
    this._running = false;

    // Send finish event (in the next tick to allow running flag to be set)
    process.nextTick(() => this.emit("finish", this));
  }

  /**
   * Private
   */

  private handleNext() {
    if (this.running && this.lines.length > 0) {
      // Incremente cursor
      this.cursor++;

      // Get line to perform command
      let line = this.lines.shift();

      // Analyze line and decide how to handle parameters
      // Get command string
      let command = line.line;

      // TODO - Check if should be done or not
      // Check if comment
      if (command.trim().startsWith(";")) {
        // Send next event to process next command
        process.nextTick(() => this.emit("next", this));
      } else {
        // Send command
        this.controller.sendCommand(command);
      }
    } else {
      // No more commands, finish job
      this.finish();
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
    };
  }
}
