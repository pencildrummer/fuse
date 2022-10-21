import { ClientPlugin } from "@fuse-labs/core-client";
import MarlinSettingsPage from "../pages/index";
import { MixerVerticalIcon } from "@fuse-labs/core-ui";

export default class MarlinSettingsClientPlugin extends ClientPlugin {
  get displayTitle() {
    return "Marlin settings";
  }

  get icon() {
    return MixerVerticalIcon;
  }

  deviceComponents(device) {
    return {
      page: {
        plugin: MarlinSettingsPage,
      },
    };
  }
}
