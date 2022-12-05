import {
  ClientToServerDeviceEvents,
  ControllerManager,
  DeviceNamespace,
  DeviceSocket,
  Plugin,
  ServerToClientDeviceEvents,
} from "@fuse-labs/core";
import chalk from "chalk";
import fs from "fs-extra";
import MarlinController, {
  MarlinControllableDevice,
} from "../lib/MarlinController/MarlinController.js";
import MarlinGCodeJob from "../lib/MarlinController/MarlinGCodeJob.js";

interface MarlinCoreClientToServerDeviceEvents
  extends ClientToServerDeviceEvents {
  "queue:jobs";
  "job:start";
  "job:pause";
  "job:resume";
  "job:stop";
  "print:file";
}

interface MarlinCoreServerToClientDeviceEvents
  extends ServerToClientDeviceEvents {
  "job:start": (job: MarlinGCodeJob) => void;
  "job:progress": (job: MarlinGCodeJob) => void;
  "job:pause": (job: MarlinGCodeJob) => void;
  "job:resume": (job: MarlinGCodeJob) => void;
  "job:finish": (job: MarlinGCodeJob) => void;
  "job:added": (job: MarlinGCodeJob) => void;
  "job:removed": (job: MarlinGCodeJob) => void;
}

interface MarlinCoreDeviceSocket
  extends DeviceSocket<
    MarlinCoreClientToServerDeviceEvents,
    MarlinCoreServerToClientDeviceEvents
  > {
  device: MarlinControllableDevice;
}

export interface MarlinCoreDeviceNamespace
  extends DeviceNamespace<
    MarlinCoreClientToServerDeviceEvents,
    MarlinCoreServerToClientDeviceEvents
  > {}

export default class MarlinCorePlugin extends Plugin<MarlinCoreDeviceSocket> {
  provision(): void {
    super.provision();
    ControllerManager.registerControllerClass("marlin", MarlinController);
  }

  initDeviceSocket(socket: MarlinCoreDeviceSocket): void {
    /**
     * List queue jobs
     */
    socket.on("queue:jobs", (fn) => {
      let device = socket.device;
      // TODO - Check for controller in device middleware?
      return fn?.(device.controller.jobs);
    });

    socket.on("job:start", (jobID, fn) => {
      socket.device.controller.startJob(jobID);
      fn?.(true);
    });

    socket.on("job:pause", (jobID, fn) => {
      socket.device.controller.pauseJob(jobID);
      fn?.(true);
    });

    socket.on("job:resume", (jobID, fn) => {
      socket.device.controller.resumeJob(jobID);
      fn?.(true);
    });

    socket.on("job:stop", (jobID, fn) => {
      socket.device.controller.stopJob(jobID);
      fn?.(true);
    });

    socket.on("print:file", (path, fn) => {
      if (!path) {
        console.error("Missing file path to start print");
        return fn?.(false);
      }

      // TODO - Use FileManager plugin class?
      // Get file
      if (!fs.existsSync(path)) {
        console.error("Missing file at path: ", path);
        return fn?.(false);
      }

      let device = socket.device;

      if (!device.controller) {
        console.error(
          "No controller registered on device",
          chalk.bold(device.name)
        );
        return fn?.(false);
      }

      // Start print job on device MarlinController

      device.controller.sendGCodeFile(path); // Should be async

      return fn?.(true);
    });
  }
}
