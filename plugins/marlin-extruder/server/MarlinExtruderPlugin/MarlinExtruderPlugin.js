import { Plugin, DeviceType } from "@fuse-labs/core";

export default class MarlinExtruderPlugin extends Plugin {
  get deviceTypes() {
    return [DeviceType.FDMPrinter];
  }
}
