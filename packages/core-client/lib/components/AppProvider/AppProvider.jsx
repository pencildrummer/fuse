import React, { useEffect, useMemo, useState } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { AppContext } from "../../hooks/useAppContext.js";
import useProviderConfig from "../../hooks/useProviderConfig.js";
import useProviderDevices from "../../hooks/useProviderDevices.js";
import useProviderPlugins from "../../hooks/useProviderPlugins.js";
import useProviderProfiles from "../../hooks/useProviderProfiles.js";
import AppLoadingView from "./AppLoadingView/AppLoadingView.jsx";
import isElectron from "is-electron";
import { coreSocket } from "../../socket.js";
import AppErrorView from "./AppErrorView.jsx";

const cache = createIntlCache();

export default function AppProvider({
  devices: fetchedDevices,
  profiles: fetchedProfiles,
  plugins: fetchedPlugins,
  config: fetchedConfig,
  locale = "en",
  messages,
  ...props
}) {
  const [appData, setAppData] = useState(null);
  const [error, setError] = useState(null);

  // Main startup function
  useEffect((_) => {
    coreSocket.connect();

    coreSocket.on("connect_error", (err) => {
      let error = new Error("Error connecting to coreSocket", { cause: err });
      console.error(error);
      setError(error);
    });

    // TODO: Should be on? Emit from server listen on client
    coreSocket.emit("app:data", (data) => {
      if (data) {
        // Set loaded app data on provider internal state
        setAppData(data);
        setError(null);
        console.log("Updated app data", data);
      } else {
        let error = new Error("Error retrieving app data. No data received!");
        console.error(error);
        setError(error);
      }
    });
  }, []);

  const profiles = useProviderProfiles(appData?.devices);
  const plugins = useProviderPlugins(appData?.plugins);
  const devices = useProviderDevices(appData?.devices);
  const config = useProviderConfig(appData?.config);

  const activePlugins = useMemo(
    (_) => plugins?.filter((p) => p.active),
    [plugins]
  );

  // Debug
  useEffect(
    (_) => {
      console.log("Changed plugins in AppContext", plugins);
    },
    [plugins]
  );

  const intl = useMemo(
    (_) =>
      createIntl(
        {
          defaultLocale: "en",
          locale: locale,
          messages: messages,
        },
        cache
      ),
    [locale, messages]
  );

  const isReady = useMemo(
    (_) => {
      return (
        Boolean(config) &&
        Boolean(plugins) &&
        Boolean(devices) &&
        Boolean(profiles)
      );
    },
    [config, plugins, devices, profiles]
  );

  if (error) {
    return <AppErrorView error={error} />;
  }

  if (isReady) {
    return (
      <AppContext.Provider
        value={{
          isReady,
          isElectron,
          config,
          devices,
          profiles,
          plugins,
          activePlugins,
          intl,
        }}
      >
        <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
      </AppContext.Provider>
    );
  } else {
    return <AppLoadingView />;
  }
}
