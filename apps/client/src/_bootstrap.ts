// These imports should be dynamic, loaded runtime, Fuse will not come with plugin pre-bundled in the main binary
import CameraClientPlugin from "@fuse-labs/camera-client";
import FileManagerClientPlugin from "@fuse-labs/file-manager-client";
import MarlinCoreClientPlugin from "@fuse-labs/marlin-core-client";
import MarlinExtraClientPlugin from "@fuse-labs/marlin-extra-client";
import MarlinExtruderClientPlugin from "@fuse-labs/marlin-extruder-client";
import MarlinGCodeViewerClientPlugin from "@fuse-labs/marlin-gcode-viewer-client";
import MarlinMoveClientPlugin from "@fuse-labs/marlin-move-client";
import MarlinSettingsClientPlugin from "@fuse-labs/marlin-settings-client";
import MarlinTemperatureClientPlugin from "@fuse-labs/marlin-temperature-client";
import TerminalClientPlugin from "@fuse-labs/terminal-client";

import { ClientAppManager, registerPlugin } from "@fuse-labs/core-client";

// TODO - Move into a _plugin.js file or something like the manager on the server side, some sort of install process for plugins
registerPlugin("@fuse-labs/terminal", TerminalClientPlugin);
registerPlugin("@fuse-labs/marlin-core", MarlinCoreClientPlugin);
registerPlugin("@fuse-labs/marlin-temperature", MarlinTemperatureClientPlugin);
registerPlugin("@fuse-labs/file-manager", FileManagerClientPlugin);
registerPlugin("@fuse-labs/marlin-settings", MarlinSettingsClientPlugin);
registerPlugin("@fuse-labs/marlin-move", MarlinMoveClientPlugin);
registerPlugin("@fuse-labs/marlin-extruder", MarlinExtruderClientPlugin);
registerPlugin("@fuse-labs/marlin-extra", MarlinExtraClientPlugin);
registerPlugin("@fuse-labs/marlin-gcode-viewer", MarlinGCodeViewerClientPlugin);
registerPlugin("@fuse-labs/camera", CameraClientPlugin);

(async () => {
  await ClientAppManager.init();
})();
