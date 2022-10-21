import { ClientPlugin } from "@fuse-labs/core-client";
import { MoveWidget, FeedRateWidget } from "../components";

export default class MarlinMoveClientPlugin extends ClientPlugin {
  get displayTitle() {
    return "Marlin move";
  }

  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: MoveWidget,
      },
    };
  }
}
