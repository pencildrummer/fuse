import fs from "fs-extra";
import { string, object, number } from "yup";
import path from "path";
import { DEVICES_BASE_PATH } from "../../../constants.js";
import { v4 as uuid } from "uuid";
import signale from "signale";
import SerialConnection from "../../connections/SerialConnection/SerialConnection.js";
import { Controller, NetworkConnection } from "../../index.js";
import { ProfileManager, socketServer } from "../../../index.js";
import { Connection, Device as CoreDevice } from "@fuse-labs/types";
import { DeviceNamespace, DeviceSocket } from "../../../socket-server.js";

export const DEVICE_SCHEMA = object({
  id: string().required(),
  name: string().defined().required(),
  port: string().defined().required(),
  baudrate: number().defined().required(),
  profileId: string().defined().required(),

  serialNumber: string().nullable().default(null),
  vendorId: string().nullable().default(null),
  productId: string().nullable().default(null),
});

export default class Device implements CoreDevice.DeviceInterface {
  id: string;
  name: string;
  port: number;
  baudrate: number;

  profileId: string;
  profile: CoreDevice.Profile.BaseInterface;

  serialNumber: string;
  vendorId: string;
  productId: string;

  connection: Connection.Interface;

  private controller: Controller;

  /**
   * The Socket.io namespace corresponding to this device
   */
  get namespace() {
    return this._namespace;
  }
  private _namespace: DeviceNamespace;

  get path() {
    return path.resolve(path.join(DEVICES_BASE_PATH, this.id + ".json"));
  }

  constructor(filePathOrData: string | CoreDevice.DataType) {
    if (typeof filePathOrData === "string") {
      // Retrieve file from path
      this.initDeviceFromPath(filePathOrData);
    } else if (typeof filePathOrData === "object") {
      // Create new object instance with data, without storing on system yet
      this.initDeviceFromData(filePathOrData);
    }
  }

  save() {
    // Save device to file system, do NOT override existing device
    try {
      // Get JSON storable data
      // TRY - use stringify, impement toJSON to return also profile object but no temrinal or other things
      let deviceData = this.toJSON();
      // Remove expanded profile obj
      delete deviceData.profile;
      // Store device data
      fs.writeFileSync(this.path, JSON.stringify(deviceData, null, 2));
    } catch (err) {
      signale.error("Unable to store new device", err);
    }
  }

  update(data) {
    this.fillDeviceWithData(data);
    this.save();
  }

  delete() {
    try {
      // Remove stored file
      fs.unlinkSync(this.path);
    } catch (err) {
      return signale.error("Unable to remove device", err);
    }
  }

  /**
   * PRIVATE
   */

  initDeviceFromPath(filePath: string) {
    signale.info("Init device from path", filePath);
    let fileContent = fs.readFileSync(path.resolve(filePath), {
      encoding: "utf-8",
    });
    let json = JSON.parse(fileContent);
    // Set device data onto instance
    this.fillDeviceWithData(json);
  }

  initDeviceFromData(data: CoreDevice.DataType) {
    // Fill data
    this.fillDeviceWithData({
      ...data,
      // Generate new random id for device
      id: uuid(),
    });
  }

  fillDeviceWithData(data: CoreDevice.DataType) {
    // Set data
    let deviceData = DEVICE_SCHEMA.validateSync(data, {
      stripUnknown: true,
    });
    Object.assign(this, deviceData);
    // Expand data and configure device
    this.configureDevice();
  }

  /**
   * Configure device with necessary properties
   */
  configureDevice() {
    // Expand profile with id
    this.profile = ProfileManager.shared.getProfile(this.profileId);
    // Set connection

    switch (this.profile.connectionType) {
      case "serial":
        this.connection = new SerialConnection(this.port, this.baudrate);
        break;
      case "network":
        this.connection = new NetworkConnection();
        break;
      default:
        throw new Error("No connection specified on device profile");
    }

    // Set controller
    let ControllerClass = Controller.getControllerClass(this.profile.firmware);
    if (!ControllerClass) {
      //throw new Error(`No controller class found for device firmware '${this.profile.firmware}'`)
      console.error(
        `No controller class found for device firmware '${this.profile.firmware}'`
      );
    } else {
      this.controller = new ControllerClass(this);
    }

    // Set socket namespace
    // Add listener to this on data:* events to be broadcasted on device namespace socket
    this._namespace = socketServer.of("/device:" + this.id);

    // Add listeners
    this.controller?.on("error", (err) => {
      console.error("Error handled by Device from controller", err);
      this.namespace.emit("error", {
        message: err.message,
        code: err.code,
      });
    });
  }

  /**
   * Manually convert Device instance in storable JSON.
   * @returns JSON data to be stored in file.
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      profileId: this.profileId,
      profile: this.profile,
      port: this.port,
      baudrate: this.baudrate,
      serialNumber: this.serialNumber,
      vendorId: this.vendorId,
      productId: this.productId,
    };
  }
}
