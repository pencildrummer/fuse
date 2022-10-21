import { ClientPlugin } from "@fuse-labs/core-client";
import { CodeIcon } from "@fuse-labs/core-ui";
import GCodeViewerPage from "../pages";

export default class MarlinGCodeViewerClientPlugin extends ClientPlugin {
  get icon() {
    return CodeIcon;
  }

  deviceComponents() {
    return {
      page: {
        // The specifi device/plugin page
        plugin: GCodeViewerPage,
      },
    };
  }
}
