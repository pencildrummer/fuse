import { ClientPlugin } from "@fuse-labs/core-client";
import { MoveWidget, FeedRateWidget } from "../components";

export default class MarlinMoveClientPlugin extends ClientPlugin {
  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: MoveWidget,
      },
    };
  }
}
