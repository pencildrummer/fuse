import { ClientPlugin } from "@fuse-labs/core-client";
import { ExtruderWidget } from "../components";

export default class MarlinExtruderClientPlugin extends ClientPlugin {
  get displayTitle() {
    return "Marlin extruder";
  }

  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: ExtruderWidget,
      },
    };
  }
}
