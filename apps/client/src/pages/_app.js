import "tailwindcss/tailwind.css";
import "../global.css";
// import '@fuse-labs/core-ui/core-ui.css'
import { CoreApp, ClientPluginManager } from "@fuse-labs/core-client";
import Head from "next/head";
import pkg from "../../package.json";

// Import Electron specific styles
import "../electron.css";

import "../_bootstrap";

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
