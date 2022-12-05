import {
  Device as CoreDevice,
  Connection as CoreConnection,
} from "@fuse-labs/types";
import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { v4 as uuid } from "uuid";
import { number, object, string } from "yup";
import { DEVICES_BASE_PATH } from "../../../constants.js";
import {
  ControllerManager,
  DeviceManager,
  logger,
  ProfileManager,
  socketServer,
} from "../../../index.js";
import { DeviceNamespace } from "../../../socket-server.js";
import {
  Controller,
  NetworkConnection,
  Connection,
  SerialConnection,
} from "../../index.js";

export const DEVICE_SCHEMA = object({
  id: string().required(),
  name: string().defined().required(),
  portPath: string().defined().required(),
  baudrate: number().defined().required(),
  profileId: string().defined().required(),

  serialNumber: string().nullable().default(null),
  vendorId: string().nullable().default(null),
  productId: string().nullable().default(null),
});

export default class Device implements CoreDevice.DeviceInterface {
  id: string;
  name: string;
  portPath: string;
  baudrate: number;
  profileId: string;

  readonly profile: CoreDevice.Profile.BaseInterface;

  readonly serialNumber: string;
  readonly vendorId: string;
  readonly productId: string;

  readonly connection: Connection;

  readonly controller: Controller;

  /**
   * The Socket.io namespace corresponding to this device
   */
  readonly namespace: DeviceNamespace;

  get path() {
    return path.resolve(path.join(DEVICES_BASE_PATH, this.id + ".json"));
  }

  constructor(filePathOrData: string | Omit<CoreDevice.DataType, "id">) {
    let deviceData: CoreDevice.DataType;
    if (typeof filePathOrData === "string") {
      // Retrieve file from path
      deviceData = this.getDeviceDataFromFilePath(filePathOrData);
    } else if (typeof filePathOrData === "object") {
      // Create new object instance with data, without storing on system yet
      deviceData = this.getDeviceDataFromData(filePathOrData);
    }

    // Set data from device data on this instance
    this.id = deviceData.id;
    this.name = deviceData.name;
    this.portPath = deviceData.portPath;
    this.baudrate = deviceData.baudrate;
    this.profileId = deviceData.profileId;
    this.serialNumber = deviceData.serialNumber;
    this.vendorId = deviceData.vendorId;
    this.productId = deviceData.productId;

    // Expand profile with id

    this.profile = ProfileManager.getProfile(this.profileId);

    // Set connection
    this.connection = this.createDeviceConnection(this.profile.connectionType);

    // Set controller
    this.controller = this.createDeviceController(this.profile.firmware);

    // Create namespace
    this.namespace = this.createDeviceNamespace(this.id);
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
      logger.error("Unable to store new device", err);
    }
  }

  update(data: any) {
    let deviceData = this.validateAsDeviceData(data);

    this.id = deviceData.id;
    this.name = deviceData.name;
    this.portPath = deviceData.portPath;
    this.baudrate = deviceData.baudrate;
    this.profileId = deviceData.profileId;

    this.save();
  }

  delete() {
    try {
      // Remove stored file
      fs.unlinkSync(this.path);
    } catch (err) {
      return logger.error("Unable to remove device", err);
    }
  }

  /**
   * PRIVATE
   */

  private getDeviceDataFromFilePath(filePath: string): CoreDevice.DataType {
    logger.info("Init device from path", filePath);
    let json = fs.readJsonSync(path.resolve(filePath), {
      encoding: "utf-8",
    });
    return this.validateAsDeviceData(json);
  }

  private getDeviceDataFromData(data: any): CoreDevice.DataType {
    return this.validateAsDeviceData({
      ...data,
      // Generate new random id for device
      id: uuid(),
    });
  }

  private validateAsDeviceData(data: any): CoreDevice.DataType {
    // Validate device data
    let deviceData = DEVICE_SCHEMA.validateSync(data, {
      stripUnknown: true,
    });
    return deviceData;
  }

  private createDeviceConnection(
    connectionType: CoreConnection.Type
  ): Connection {
    switch (this.profile.connectionType) {
      case "serial":
        return new SerialConnection(this.portPath, this.baudrate);
        break;
      case "network":
        return new NetworkConnection();
        break;
      default:
        throw new Error("No connection specified on device profile");
    }
  }

  private createDeviceController(
    firmware: CoreDevice.FirmwareType
  ): Controller {
    // Set controller
    let ControllerClass = ControllerManager.getControllerClass(firmware);
    if (!ControllerClass) {
      //throw new Error(`No controller class found for device firmware '${this.profile.firmware}'`)
      console.error(
        `No controller class found for device firmware '${firmware}'`
      );
    } else {
      let controller = new ControllerClass(this);

      // Add error listeners
      controller?.on("error", (err) => {
        console.error("Error handled by Device from controller", err);
        this.namespace.emit("error", {
          message: err.message,
          code: err.code,
        });
      });

      return controller;
    }
  }

  private createDeviceNamespace(
    id: CoreDevice.DataType["id"]
  ): DeviceNamespace {
    // Set socket namespace
    // Add listener to this on data:* events to be broadcasted on device namespace socket
    return socketServer.of("/device:" + id);
  }

  /**
   * Manually convert Device instance in storable JSON.
   * @returns JSON data to be stored in file.
   */
  // TODO: Define a better type for returned JSON?
  toJSON(): CoreDevice.DeviceInterface {
    return {
      id: this.id,
      name: this.name,
      profileId: this.profileId,
      profile: this.profile,
      portPath: this.portPath,
      baudrate: this.baudrate,
      serialNumber: this.serialNumber,
      vendorId: this.vendorId,
      productId: this.productId,
    };
  }
}
