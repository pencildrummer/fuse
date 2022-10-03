import { ClientPlugin } from "@fuse-labs/core-client";
import MarlinJobQueueHandler from "./components/MarlinJobQueueHandler/MarlinJobQueueHandler.jsx";

export default class MarlinCoreClientPlugin extends ClientPlugin {
  version() {}
  deviceComponents(device) {
    // Maybe move it into a config? or leave it dynamic here?
    return {
      page: {
        topBar: MarlinJobQueueHandler,
      },
    };
  }
}
