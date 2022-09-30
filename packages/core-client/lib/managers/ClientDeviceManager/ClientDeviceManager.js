import ClientDevice from "../../models/ClientDevice/ClientDevice.js";
import { coreSocket } from "../../socket.js";

class ClientDeviceManager extends EventTarget {
  _initialized = false;
  get initialized() {
    return this._initialized;
  }

  _devices = [];
  get devices() {
    return this._devices;
  }

  constructor() {
    super();
  }

  init(fetchedDevicesData) {
    this._devices =
      fetchedDevicesData?.map((deviceData) => new ClientDevice(deviceData)) ||
      [];
    // Notify we updated (creating the manager) the list of devices
    this.dispatchEvent(new Event("updatedDevices"));

    // Add socket listener for newly created device on server
    coreSocket.on("devices:added", this._handleDeviceAdded);
    // Add socket listener for updated device on server
    coreSocket.on("devices:updated", this._handleDeviceUpdated);
    // Add socket listener for removed device on server
    coreSocket.on("devices:removed", this._handleDeviceRemoved);

    console.log("INITED MANAGER Devices", this._devices);
    this._initialized = true;
  }

  getDevice(deviceId) {
    return this._devices.find((device) => device.id == deviceId);
  }

  getDevicesForType(deviceType) {
    return this._devices.filter((device) => device.type == deviceType);
  }

  /**
   * Private
   */

  _handleDeviceAdded(deviceData) {
    let device = new ClientDevice(deviceData);
    this._devices = [...this._devices, device];
    // Notify
    this.dispatchEvent(new Event("updatedDevices"));
  }

  _handleDeviceUpdated(deviceData) {
    let device = this._devices.find((d) => d.id === deviceData.id);
    if (device) {
      device.update(deviceData);
    } else {
      console.log(
        "Received request to update local device but no device has been found with id",
        deviceData.id
      );
    }
    // Notify
    this.dispatchEvent(new Event("updatedDevices"));
  }

  _handleDeviceRemoved(deviceData) {
    this._devices = this._devices.filter(
      (device) => device.id !== deviceData.id
    );
    // Notify
    this.dispatchEvent(new Event("updatedDevices"));
  }
}

class Singleton {
  constructor() {
    throw new Error("Use ClientDeviceManager.shared instead");
  }
  static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientDeviceManager();
    }
    return Singleton.sharedInstance;
  }
}
export default Singleton;
