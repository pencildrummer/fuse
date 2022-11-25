import React, { useEffect, useMemo, useState } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { AppContext } from "../../hooks/useAppContext";
import useProviderConfig from "../../hooks/useProviderConfig";
import useProviderDevices from "../../hooks/useProviderDevices";
import useProviderPlugins from "../../hooks/useProviderPlugins";
import useProviderProfiles from "../../hooks/useProviderProfiles";
import AppLoadingView from "./AppLoadingView/AppLoadingView";
import isElectron from "is-electron";
import { coreSocket } from "../../socket";
import AppErrorView from "./AppErrorView";

const cache = createIntlCache();

export default function AppProvider({ locale = "en", messages, ...props }) {
  const [appData, setAppData] = useState(null);
  const [error, setError] = useState(null);

  // Main startup function
  useEffect(() => {
    coreSocket.connect();

    coreSocket.on("connect_error", (err) => {
      let error = new Error("Error connecting to coreSocket", { cause: err });
      console.error(error);
      setError(error);
    });

    reloadAppData();
  }, []);

  function reloadAppData() {
    // Request update app data
    return new Promise((resolve, reject) => {
      coreSocket.emit("app:data:get", (data) => {
        if (data) {
          // Set loaded app data on provider internal state
          setAppData(data);
          setError(null);
          console.log("Updated app data", data);
          resolve(data);
        } else {
          let error = new Error("Error retrieving app data. No data received!");
          console.error(error);
          setError(error);
          reject(error);
        }
      });
    });
  }

  const profiles = useProviderProfiles(appData?.devices);
  const plugins = useProviderPlugins(appData?.plugins);
  const devices = useProviderDevices(appData?.devices);
  const config = useProviderConfig(appData?.config);

  const activePlugins = useMemo(
    () => plugins?.filter((p) => p.active),
    [plugins]
  );

  // Debug
  useEffect(() => {
    console.log("Changed plugins in AppContext", plugins);
  }, [plugins]);

  const intl = useMemo(
    () =>
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

  const isReady = useMemo(() => {
    return (
      Boolean(config) &&
      Boolean(plugins) &&
      Boolean(devices) &&
      Boolean(profiles)
    );
  }, [config, plugins, devices, profiles]);

  if (error) {
    return <AppErrorView error={error} onRefresh={reloadAppData} />;
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
