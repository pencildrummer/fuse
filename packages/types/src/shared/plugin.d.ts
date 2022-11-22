import { Device } from "./device";

// TODO: Verify if type is correct, merge with PluginInterface?
export interface PluginDataType {
  /** Plugin name */
  readonly name: string;
  /** Human readable plugin name to display on UI and log info */
  readonly displayName: string;
  /** TODO: Describe doc and check if needed */
  readonly path: string;
  /** Plugin version */
  readonly version: string;
  /** Plugin library name TODO: check if needed or not */
  readonly libraryName: string;
  /** Plugin settings */
  readonly settings: any;
  /** If plugin has a dedicated socket */
  readonly hasSocket: boolean;
  /** If plugin has a dedicated device socket */
  readonly hasDeviceSocket: boolean;
  /** Returns if the plugin is currently active on the host */
  readonly active: boolean;
  /** Returns if the plugin is a system plugin */
  readonly system: boolean;
  /** Returns allowed device type for this plugin */
  readonly deviceTypes: Device.Type[];
}

export interface PluginInterface {
  /** Plugin name */
  readonly name: string;
  /** Human readable plugin name to display on UI and log info */
  readonly displayName: string;
  /** TODO: Describe doc and check if needed */
  readonly path: string;
  /** Plugin version */
  readonly version: string;
  /** Plugin library name TODO: check if needed or not */
  readonly libraryName: string;
  /** Plugin settings */
  readonly settings: any;
  /** If plugin has a dedicated socket */
  readonly hasSocket: boolean;
  /** If plugin has a dedicated device socket */
  readonly hasDeviceSocket: boolean;
  /** Returns if the plugin is currently active on the host */
  readonly active: boolean;
  /** Returns if the plugin is a system plugin */
  readonly system: boolean;
  /** Returns allowed device type for this plugin */
  readonly deviceTypes: Device.Type[] | null;
}
