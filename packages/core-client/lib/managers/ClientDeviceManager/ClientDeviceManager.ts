import { Device } from "@fuse-labs/types";
import ClientDevice from "../../models/ClientDevice/ClientDevice";
import { coreSocket } from "../../socket";

class ClientDeviceManager extends EventTarget {
  private _initialized = false;
  get initialized() {
    return this._initialized;
  }

  private _devices: ClientDevice[] = [];
  get devices() {
    return this._devices;
  }

  constructor() {
    super();
  }

  init(fetchedDevicesData: Device.DataType[]) {
    this._devices =
      fetchedDevicesData?.map((deviceData) => new ClientDevice(deviceData)) ||
      [];
    // Notify we updated (creating the manager) the list of devices
    this.dispatchEvent(new Event("updatedDevices"));

    // Add socket listener for newly created device on server
    coreSocket.on("devices:added", this._handleDeviceAdded.bind(this));
    // Add socket listener for updated device on server
    coreSocket.on("devices:updated", this._handleDeviceUpdated.bind(this));
    // Add socket listener for removed device on server
    coreSocket.on("devices:removed", this._handleDeviceRemoved.bind(this));

    console.log("INITED MANAGER Devices", this._devices);
    this._initialized = true;
  }

  getDevice(deviceId: string) {
    return this._devices.find((device) => device.id == deviceId);
  }

  getDevicesForType(deviceType: Device.Profile.Type) {
    return this._devices.filter((device) => device.profile.type == deviceType);
  }

  /**
   * Private
   */

  _handleDeviceAdded(deviceData: Device.DataType) {
    let device = new ClientDevice(deviceData);
    this._devices = [...this._devices, device];
    // Notify
    this.dispatchEvent(new Event("updatedDevices"));
  }

  _handleDeviceUpdated(deviceData: Device.DataType.Mutable) {
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

  _handleDeviceRemoved(deviceData: Device.DataType) {
    this._devices = this._devices.filter(
      (device) => device.id !== deviceData.id
    );
    // Notify
    this.dispatchEvent(new Event("updatedDevices"));
  }
}

class Singleton {
  private static sharedInstance: ClientDeviceManager;
  constructor() {
    throw new Error("Use ClientDeviceManager instead");
  }
  public static get shared() {
    if (!Singleton.sharedInstance) {
      Singleton.sharedInstance = new ClientDeviceManager();
    }
    return Singleton.sharedInstance;
  }
}
export default Singleton;
