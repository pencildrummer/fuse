import { ConfigDataType } from "./config.js";
import { Device } from "./device.js";
import { PluginInterface } from "./plugin.js";

export type AppDataType = {
  readonly devices: Device.DeviceInterface[];
  readonly plugins: { [pluginName: string]: PluginInterface };
  readonly profiles: { [profileId: string]: Device.Profile.BaseInterface };
  readonly config: ConfigDataType;
};
