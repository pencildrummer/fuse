import { Plugin, DeviceType } from "@fuse-labs/core";

export default class MarlinExtraPlugin extends Plugin {
  get deviceTypes() {
    return [DeviceType.FDMPrinter];
  }
}
