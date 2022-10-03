import { ClientPlugin } from "@fuse-labs/core-client";
import { FileIcon } from "@fuse-labs/core-ui";
import { DeviceFileManagerWidget } from "./components/index.js";
import IndexPage from "./tabs/index.jsx";

export default class FileManagerClientPlugin extends ClientPlugin {
  get displayTitle() {
    return "File manager";
  }

  get icon() {
    return FileIcon;
  }

  components() {
    // TODO - Add support multiple tabs later in ClientPlugin
    return {
      tab: IndexPage,
    };
  }

  deviceComponents(device) {
    return {
      page: {
        home: DeviceFileManagerWidget,
      },
    };
  }
}
