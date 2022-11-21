import "tailwindcss/tailwind.css";
import "../global.css";
// import '@fuse-labs/core-ui/core-ui.css'
import { CoreApp, ClientPluginManager } from "@fuse-labs/core-client";
import Head from "next/head";
import pkg from "../../package.json";

// Import Electron specific styles
import "../electron.css";

import "../_bootstrap";
import { AppProps } from "next/app";

function MyApp(props: AppProps) {
  return (
    <>
      <Head>
        <title>{`Fuse • v.${pkg.version}`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5E35D1" />
        <meta name="msapplication-TileColor" content="#5E35D1" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <CoreApp {...props} />
    </>
  );
}

export default MyApp;
