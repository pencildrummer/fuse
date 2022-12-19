import { socket } from "../../socket";
import { object, string, number, SchemaOf } from "yup";
import ClientPluginManager from "../../managers/ClientPluginManager/ClientPluginManager";
import ClientPlugin from "../ClientPlugin/ClientPlugin";
import { Device } from "@fuse-labs/types";
import { Socket } from "socket.io-client";
import ClientDeviceProfile from "../ClientDeviceProfile/ClientDeviceProfile";
import ClientPrinterDeviceProfile from "../ClientDeviceProfile/ClientPrinterDeviceProfile";
import ClientCNCDeviceProfile from "../ClientDeviceProfile/ClientCNCDeviceProfile";

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

export type ClientPrinterDevice = ClientDevice<ClientPrinterDeviceProfile>;
export type ClientCNCDevice = ClientDevice<ClientCNCDeviceProfile>;
export type ClientLaserCNCDevice = ClientDevice<ClientLaserDeviceProfile>;

export default class ClientDevice<
  P extends ClientDeviceProfile = ClientDeviceProfile
> implements Device.DeviceInterface
{
  id: string;
  name: string;
  portPath: string;
  baudrate: number;

  profileId: string;
  profile: P;

  serialNumber: string;
  vendorId: string;
  productId: string;

  socket?: Socket; // TODO: Set socket type
  pluginSockets: {
    [scopeOrName: string]: { [name: string]: Socket };
  } = {};

  /**
   * Return active plugins compatible with this device
   */
  get plugins() {
    return ClientPluginManager.activePlugins.filter((plugin) =>
      plugin.deviceTypes.includes(this.profile.type)
    );
  }

  /**
   * Return all compatible plugins with this device
   */
  get allPlugins(): ClientPlugin[] {
    return ClientPluginManager.plugins.filter((plugin) =>
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
