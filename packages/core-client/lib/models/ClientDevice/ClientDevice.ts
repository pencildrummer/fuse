import { socket } from "../../socket";
import { object, string, number, SchemaOf } from "yup";
import ClientPluginManager from "../../managers/ClientPluginManager/ClientPluginManager";
import ClientPlugin from "../ClientPlugin/ClientPlugin";
import { Device } from "@fuse-labs/types";
import { Socket } from "socket.io-client";

const SCHEMA: SchemaOf<Device.DataType> = object({
  id: string().defined().required(),
  name: string().defined().required(),
  portPath: string().defined().required(),
  baudrate: number().defined().required(),
  profileId: string().defined().required(),

  serialNumber: string().optional().nullable().default(null),
  vendorId: string().optional().nullable().default(null),
  productId: string().optional().nullable().default(null),
});

export default class ClientDevice implements Device.DeviceInterface {
  id: string;
  name: string;
  portPath: string;
  baudrate: number;

  profileId: string;
  profile: any; // TODO: Create ClientDeviceProfile type

  serialNumber: string;
  vendorId: string;
  productId: string;

  socket?: Socket; // TODO: Set socket type

  /**
   * Return active plugins compatible with this device
   */
  get plugins() {
    return ClientPluginManager.shared.activePlugins.filter((plugin) =>
      plugin.deviceTypes.includes(this.profile.type)
    );
  }

  /**
   * Return all compatible plugins with this device
   */
  get allPlugins(): ClientPlugin[] {
    return ClientPluginManager.shared.plugins.filter((plugin) =>
      plugin.deviceTypes.includes(this.profile.type)
    );
  }

  // TODO: Maybe use already declared in types or something similar
  private get immutableKeys() {
    return ["id", "profile", "serialNumber", "vendorId", "productId"];
  }

  constructor(data: Device.DataType) {
    // Create device object
    let device = SCHEMA.validateSync(data);
    Object.assign(this, device);

    // Init device socket
    if (!this.socket) {
      this.socket = socket(`device:${device.id}`);
    }
  }

  update(data: Device.DataType.Mutable) {
    // Remove id data
    let cleanData = Object.keys(data).reduce(
      (res, key) => {
        if (this.immutableKeys.includes(key)) {
          console.warn(
            "Trying to update an immutable ClientDevice property:",
            key
          );
        } else {
          console.log("RES", res);
          res[key] = data[key];
        }
        return res;
      },
      { ...this }
    );
    let newData = SCHEMA.validateSync(cleanData);
    Object.assign(this, newData);
  }
}
