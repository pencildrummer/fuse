import { ClientPluginManager } from "@fuse-labs/core-client";

// These imports should be dynamic, loaded runtime, Fuse will not come with plugin pre-bundled in the main binary
import TerminalClientPlugin from "@fuse-labs/terminal-client";
import MarlinCoreClientPlugin from "@fuse-labs/marlin-core-client";
import MarlinTemperatureClientPlugin from "@fuse-labs/marlin-temperature-client";
import MarlinSettingsClientPlugin from "@fuse-labs/marlin-settings-client";
import MarlinMoveClientPlugin from "@fuse-labs/marlin-move-client";
import MarlinExtruderClientPlugin from "@fuse-labs/marlin-extruder-client";
import MarlinExtraClientPlugin from "@fuse-labs/marlin-extra-client";
import MarlinGCodeViewerClientPlugin from "@fuse-labs/marlin-gcode-viewer-client";
import FileManagerClientPlugin from "@fuse-labs/file-manager-client";
import CameraClientPlugin from "@fuse-labs/camera-client";

// TODO - Move into a _plugin.js file or something like the manager on the server side, some sort of install process for plugins
ClientPluginManager.registerPlugin("@fuse-labs/terminal", TerminalClientPlugin);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-core",
  MarlinCoreClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-temperature",
  MarlinTemperatureClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/file-manager",
  FileManagerClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-settings",
  MarlinSettingsClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-move",
  MarlinMoveClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-extruder",
  MarlinExtruderClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-extra",
  MarlinExtraClientPlugin
);
ClientPluginManager.registerPlugin(
  "@fuse-labs/marlin-gcode-viewer",
  MarlinGCodeViewerClientPlugin
);
ClientPluginManager.registerPlugin("@fuse-labs/camera", CameraClientPlugin);
