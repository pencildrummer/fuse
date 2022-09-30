import "tailwindcss/tailwind.css";
import "../global.css";
// import '@fuse-labs/core-ui/core-ui.css'
import { CoreApp, ClientPluginManager } from "@fuse-labs/core-client";
import Head from "next/head";
import pkg from "../../package.json";

// Import Electron specific styles
import "../electron.css";

// These imports should be dynamic, loaded runtime, Fuse will not come with plugin pre-bundled in the main binary
import TerminalClientPlugin from "@fuse-labs/terminal-client";
// import MarlinCoreClientPlugin from '@fuse-labs/marlin-core/client'
// import MarlinTemperatureClientPlugin from '@fuse-labs/marlin-temperature/client'
// import MarlinSettingsClientPlugin from '@fuse-labs/marlin-settings/client'
// import FileManagerClientPlugin from '@fuse-labs/file-manager/client'

// TODO - Move into a _plugin.js file or something like the manager on the server side, some sort of install process for plugins
ClientPluginManager.registerPlugin("@fuse-labs/terminal", TerminalClientPlugin);
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-core', MarlinCoreClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-temperature', MarlinTemperatureClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/file-manager', FileManagerClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-settings', MarlinSettingsClientPlugin)

function MyApp(props) {
  return (
    <>
      <Head>
        <title>{`Fuse • v.${pkg.version}`}</title>
      </Head>
      <CoreApp {...props} />
    </>
  );
}

export default MyApp;
