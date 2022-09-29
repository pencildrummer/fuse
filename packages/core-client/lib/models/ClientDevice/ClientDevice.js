import { socket } from "../../socket";
import lodash from "lodash";
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

  /** @type {Array<ClientPlugin>} */
  plugins;

  get immutableKeys() {
    return ["id", "profile", "serialNumber", "vendorId", "productId"];
  }

  constructor(data) {
    // Create device object
    let device = SCHEMA.validateSync(data);
    Object.assign(this, device);

    // Init device socket
    if (!this.socket) this.socket = socket(`device:${device.id}`);

    // Load and set active plugins on device
    // TODO - Create an activation method on device or plugin classes
    this.plugins = Object.values(ClientPluginManager.shared.plugins)?.filter(
      (plugin) => plugin.deviceTypes?.includes(device.profile.type)
    );

    //Create socket for active plugins
    this.plugins?.forEach((plugin) => {
      if (!plugin.hasDeviceSocket) return;

      let keyPath = plugin.name
        .split("/")
        .map((key) => lodash.camelCase(key))
        .join(".");
      if (!lodash.get(this, "sockets." + keyPath)) {
        let pluginDeviceSocket = socket(`device:${this.id}/${plugin.name}`);
        lodash.set(this, "sockets." + keyPath, pluginDeviceSocket);
      }
    });

    // TODO - Dynamic import of file in plugin directory to customise behaviour

    // DEV ONLY
    // if (this.plugins.find(p => p.name == '@fuse-labs/marlin-terminal')) {
    //   // Init terminal for device
    //   this.terminal = new Terminal(this, { autoConnect: false })
    //   console.log(`Terminal for device "${this.id}" initialized`)
    // }
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
