import { Device, PluginInterface } from "@fuse-labs/types";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import lodash from "lodash";
import React from "react";
import { array, boolean, object, SchemaOf, string } from "yup";
import { ClientDevice } from "..";
import ClientDeviceManager from "../../managers/ClientDeviceManager/ClientDeviceManager";
import ClientPluginManager from "../../managers/ClientPluginManager/ClientPluginManager";
import { coreSocket, socket } from "../../socket";

// TODO: Reverse yup schema from TS type?
const ClientPluginSchema: SchemaOf<PluginInterface> = object({
  name: string().defined().required(),
  displayName: string().defined().required(),
  version: string().defined().required(),
  path: string().defined().required(),
  libraryName: string().defined().required(),
  deviceTypes: array().defined().required(),
  settings: boolean().defined().required(),
  hasSocket: boolean().defined().required(),
  hasDeviceSocket: boolean().defined().required(),
  active: boolean().defined().required(),
  system: boolean().defined().required(),
});

// TODO: Check type and improve
type ClientPluginComponentsType = {
  page?: React.ComponentType;
  tab?: React.ComponentType;
};

// TODO: Check type and improve
type ClientPluginDeviceComponentsType = {
  page?: {
    plugin?: React.ComponentType;
    topBar?: React.ComponentType;
  };
  settings?: React.ComponentType;
};

export default class ClientPlugin implements PluginInterface {
  /* PluginInterface implementation */
  readonly name: string;
  readonly version: string;
  readonly settings: any;
  readonly path: string;
  readonly libraryName: string;
  readonly hasSocket: boolean;
  readonly hasDeviceSocket: boolean;
  // private _active: boolean;
  get active() {
    return ClientPluginManager.isPluginActive(this.name);
  }
  readonly system: boolean;
  readonly deviceTypes: Device.Profile.Type[];

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
    return ClientDeviceManager.devices.filter((device) =>
      this.deviceTypes.includes(device.profile.type)
    );
  }

  constructor(data) {
    if (!data) {
      throw new Error(
        `Missing data to initialize plugin. Probably plugin is not configured correctly or listed as loaded on the host`
      );
    }

    try {
      // Validate data
      let pluginData = ClientPluginSchema.validateSync(data);

      // Set validated data on instance

      this.name = pluginData.name;
      this.version = pluginData.version;
      this.settings = pluginData.settings;
      this.path = pluginData.path;
      this.libraryName = pluginData.libraryName;
      this.hasSocket = pluginData.hasSocket;
      this.hasDeviceSocket = pluginData.hasDeviceSocket;
      this.system = pluginData.system;
      this.deviceTypes = pluginData.deviceTypes;

      // Init plugin socket if needed
      if (this.hasSocket) {
        this.socket = socket(this.name);
        this.socket.connect();
      }
    } catch (error) {
      console.error("Validation error - " + error.message);
      console.error("Error creating ClientPlugin with data:");
      console.error(data);
      console.error(error);
    }
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
        if (!lodash.get(device.pluginSockets, keyPath)) {
          let pluginDeviceSocket = socket(`device:${device.id}/${this.name}`);
          lodash.set(device.pluginSockets, keyPath, pluginDeviceSocket);
        }
      });
    } else {
      console.log("No device socket to provision for ", this.name);
    }

    // To be implemented in subclasses
  }
}
