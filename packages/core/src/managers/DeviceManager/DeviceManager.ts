import { Device as CoreDevice } from "@fuse-labs/types";
import fs from "fs-extra";
import path from "path";
import { DEVICES_BASE_PATH } from "../../constants.js";
import { logger } from "../../logger.js";
import Device from "../../models/devices/Device/Device.js";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";

let instance: DeviceManager;

class DeviceManager extends BaseManager {
  private _devices: Device[] = [];
  get devices() {
    return this._devices;
  }

  constructor() {
    super();
    if (instance)
      throw new Error("Created new shared ConfigManager is not permitted");
    instance = this;

    // // Automatically init on creation
    // this.init();
  }

  async init() {
    // Ensure directory exists, if dir has been removed it will be created
    fs.ensureDirSync(DEVICES_BASE_PATH);
    let entries = fs.readdirSync(DEVICES_BASE_PATH, { withFileTypes: true });

    // Loop and create Device instances
    this._devices = entries.reduce((entries, entry) => {
      if (entry.isFile()) {
        // Check for correct extension
        if (path.extname(entry.name) == ".json") {
          // Read file content
          let device = new Device(path.join(DEVICES_BASE_PATH, entry.name));
          if (device) {
            return [...entries, device];
          }
        }
      }
      return entries;
    }, []);
  }

  getDevice(deviceId: Device["id"]) {
    return this._devices?.find((device) => device.id == deviceId);
  }

  addDevice(data: CoreDevice.DataType) {
    let device = new Device(data);
    // Save device on file system
    device.save();

    logger.complete(`Added new device - id: ${device.id}`);

    // Push new device on current system devices
    this._devices.push(device);

    // Return newly added device
    return device;
  }

  updateDevice(deviceId: Device["id"], data: CoreDevice.DataType.Mutable) {
    // Get device to update
    let device = this.getDevice(deviceId);
    // Update device data
    device.update(data);
    return device;
  }

  removeDevice(deviceId: Device["id"]) {
    let device = this.getDevice(deviceId);
    if (!device) {
      return logger.error("Unable found device to remove -", deviceId);
    }
    // Remove device file from file system
    device.delete();
    // Replace in memory device removing device
    this._devices = this._devices.filter((d) => d.id !== deviceId);
    // Return the remove device
    return device;
  }
}

const deviceManager = getProxiedManager(new DeviceManager());
export default deviceManager;
