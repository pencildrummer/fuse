import { socket } from "../../socket";
import { object, string, number } from "yup";
import ClientPluginManager from "../../managers/ClientPluginManager/ClientPluginManager";
import ClientPlugin from "../ClientPlugin/ClientPlugin";

const SCHEMA = object({
  id: string().required(),
  name: string().defined().required(),
  port: string().defined().required(),
  baudrate: number().defined().required(),
  profileId: string().defined().required(),

  serialNumber: string().nullable().default(null),
  vendorId: string().nullable().default(null),
  productId: string().nullable().default(null),
});

export default class ClientDevice {
  id;
  name;
  port;
  baudrate;

  profileId;
  profile;

  serialNumber;
  vendorId;
  productId;

  /**
   * Return active plugins compatible with this device
   *  @type {Array<ClientPlugin>}
   */
  get plugins() {
    return ClientPluginManager.shared.activePlugins.filter((plugin) =>
      plugin.deviceTypes.includes(this.profile.type)
    );
  }

  /**
   * Return all compatible plugins with this device
   *  @type {Array<ClientPlugin>}
   */
  get allPlugins() {
    return ClientPluginManager.shared.plugins.filter((plugin) =>
      plugin.deviceTypes.includes(this.profile.type)
    );
  }

  get immutableKeys() {
    return ["id", "profile", "serialNumber", "vendorId", "productId"];
  }

  constructor(data) {
    // Create device object
    let device = SCHEMA.validateSync(data);
    Object.assign(this, device);

    // Init device socket
    if (!this.socket) {
      this.socket = socket(`device:${device.id}`);
    }
  }

  update(data) {
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
