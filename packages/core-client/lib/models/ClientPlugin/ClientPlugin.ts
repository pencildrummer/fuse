import { object, string, boolean, array } from "yup";
import { socket } from "../../socket";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import ClientDeviceManager from "../../managers/ClientDeviceManager/ClientDeviceManager";
import ClientDeviceType from "../ClientDeviceType/ClientDeviceType";
import lodash from "lodash";
import { DeviceType, PluginInterface } from "@fuse-labs/types";
import { ClientDevice } from "..";
import React from "react";

// TODO: Reverse yup schema from TS type?
const CONSTRUCTOR_SCHEMA = object({
  name: string().required(),
  _version: string().required(),
  _deviceTypes: array().required(),
  _settings: boolean(),
  _hasPages: boolean(),
  _hasTabs: boolean(),
  _hasSocket: boolean(),
  _hasDeviceSocket: boolean(),
  //_fuse: object().required(),
  _active: boolean(),
  _system: boolean(),
});

// TODO: Check type and improve
type ClientPluginComponentsType = {
  page?: React.Component;
  tab?: React.Component;
};

// TODO: Check type and improve
type ClientPluginDeviceComponentsType = {
  page?: {
    plugin: React.Component;
  };
  settings?: React.Component;
};

export default class ClientPlugin implements PluginInterface {
  /* PluginInterface implementation */
  name: string;
  version: string;
  settings: any;
  path: string;
  libraryName: string;
  hasSocket: boolean;
  hasDeviceSocket: boolean;
  active: boolean;
  system: boolean;
  deviceTypes: DeviceType[];

  get url() {
    // Check url is manually provided or generate one based on plugin name
    return this.name;
    //return this._fuse.pagesUrl || this.name
  }

  readonly socket: any; // TODO Use socket type

  get icon() {
    return QuestionMarkIcon;
  }

  get displayName() {
    return this.name;
  }

  // Retrieve device compatible with plugin
  get devices() {
    return ClientDeviceManager.shared.devices.filter((device) =>
      this.deviceTypes.includes(device.profile.type)
    );
  }

  constructor(data) {
    if (!data) {
      throw new Error(
        `Missing data to initialize plugin. Probably plugin is not configured correctly or listed as loaded on the host`
      );
    }

    // Set validated data on instance
    let pluginData = CONSTRUCTOR_SCHEMA.validateSync(data);
    Object.assign(this, pluginData);

    // Init plugin socket if needed
    if (this.hasSocket) {
      this.socket = socket(this.name);
    }

    // Automatically provision plugin on initialization
    //this.provision();
  }

  /**
   * Returns dynamic plugin components
   */
  components(): ClientPluginComponentsType {
    return {};
  }

  /**
   * Returns dynamic plugin components for device
   * @param {ClientDevice} device
   * @returns
   */
  deviceComponents(device: ClientDevice): ClientPluginDeviceComponentsType {
    return {};
  }

  /**
   * Called each time a plugin is installed. Called also on ClientManager "updatedDevices".
   * Call super.provision() when subclasses
   */
  provision() {
    if (!this.active) {
      throw new Error("Trying to provision inactive plugin");
    }

    //

    // TODO: Move into specific method and decide if keep in this class or in ClientPluginManager

    // Create device socket if needed
    if (this.hasDeviceSocket) {
      this.devices?.forEach((device) => {
        let keyPath = this.name
          .split("/")
          .map((key) => lodash.camelCase(key))
          .join(".");
        if (!lodash.get(device, "sockets." + keyPath)) {
          let pluginDeviceSocket = socket(`device:${device.id}/${this.name}`);
          lodash.set(device, "sockets." + keyPath, pluginDeviceSocket);
        }
      });
    } else {
      console.log("No device socket to provision for ", this.name);
    }

    // To be implemented in subclasses
  }
}
