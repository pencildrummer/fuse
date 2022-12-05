import { Device as CoreDevice } from "@fuse-labs/types";
import { Controller } from "../../models/index.js";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";

class ControllerManager extends BaseManager {
  private _registeredControllers: {
    [firmware: string]: new (device) => Controller;
  } = {};

  async init(): Promise<void> {}

  // Device controllers

  registerControllerClass<T extends Controller>(
    deviceFirmware: CoreDevice.FirmwareType,
    ControllerClass: new (device) => T
  ) {
    this._registeredControllers[deviceFirmware] = ControllerClass;
  }

  getControllerClass(
    deviceFirmware: CoreDevice.FirmwareType
  ): new (device) => Controller {
    return this._registeredControllers[deviceFirmware];
  }
}

const controllerManager = getProxiedManager(new ControllerManager());
export default controllerManager;
