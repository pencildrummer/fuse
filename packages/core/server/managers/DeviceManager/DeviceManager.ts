import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { DEVICES_BASE_PATH } from "../../constants.js";
import Device from "../../models/devices/Device/Device.js";
import { Device as CoreDevice } from "@fuse-labs/types";

class DeviceManager {
  private _devices: Device[] = [];
  get devices() {
    return this._devices;
  }

  _initialized = false;

  constructor() {
    this.init();
  }

  init() {
    if (this._initialized)
      throw new Error("Trying to re-initialize DeviceManager");

    signale.pending("Initializing DeviceManager");

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

    this._initialized = true;

    signale.success("DeviceManager is now ready");
  }

  getDevice(deviceId: Device["id"]) {
    return this._devices?.find((device) => device.id == deviceId);
  }

  addDevice(data: Omit<CoreDevice.DataType, "id">) {
    // TODO - Validate device parameter
    // TODO - Use Device class when able to import ESM
    let device = new Device(data);
    console.log("Adding", device);
    // Save device on file system
    device.save();

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
      return signale.error("Unable found device to remove -", deviceId);
    }
    // Remove device file from file system
    device.delete();
    // Replace in memory device removing device
    this._devices = this._devices.filter((d) => d.id !== deviceId);
    // Return the remove device
    return device;
  }
}

// Export shared manager
class Singleton {
  private static sharedInstance: DeviceManager;
  constructor() {
    throw new Error("User DeviceManager.shared instead");
  }

  static get shared() {
    if (!Singleton.sharedInstance) {
      signale.note("New shared instance of DeviceManager");
      Singleton.sharedInstance = new DeviceManager();
    }
    return Singleton.sharedInstance;
  }
}
export default Singleton;
