import { ClientPlugin } from "@fuse-labs/core-client";
import MarlinExtraWidget from "../components/MarlinExtraWidget/MarlinExtraWidget";

export default class MarlinExtraClientPlugin extends ClientPlugin {
  get displayName() {
    return "Marlin extra";
  }

  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: MarlinExtraWidget,
      },
    };
  }
}
