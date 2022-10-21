import { ClientPlugin } from "@fuse-labs/core-client";
import { CameraIcon } from "@fuse-labs/core-ui";
import CameraPage from "../pages/CameraPage";
import SettingsPage from "../pages/SettingsPage";

export default class CameraClientPlugin extends ClientPlugin {
  get displayTitle() {
    return "Camera";
  }

  get icon() {
    return CameraIcon;
  }

  components() {
    return {
      page: {
        // The general settings page for plugin
        settings: SettingsPage,
      },
    };
  }

  deviceComponents(device) {
    return {
      page: {
        // Add widget to the device home page
        // home: TemperatureWidget,
        // The specifi device/plugin page
        plugin: CameraPage,
      },
    };
  }
}
