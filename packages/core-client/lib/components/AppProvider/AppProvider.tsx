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
import { AppDataType } from "@fuse-labs/types";
import AppError from "../../errors/AppError";
import AppConnectionError from "../../errors/AppConnectionError";
import AppConnectingView from "./AppConnectingView";

const cache = createIntlCache();

export default function AppProvider({ locale = "en", messages, ...props }) {
  const [appData, setAppData] = useState(null);

  // Use mirror of coreSocket?
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Main startup function
  useEffect(() => {
    // Init socket base listeners
    coreSocket.on("connect", () => {
      setConnecting(false);
      setError(null);
      setConnected(true);
      // Once connected request app data
      requestAppData();
    });

    coreSocket.on("connect_error", (err) => {
      console.error(err);
      let error = new AppConnectionError(err);
      console.error(error);
      setConnected(false);
      setConnecting(false);
      setError(error);
    });

    // Connect to core socket
    connect();
  }, []);

  function connect() {
    console.log("Connecting");
    // TODO: Prevent calling connect() on already connected or connecting states?
    setConnecting(true);
    coreSocket.connect();
  }

  function requestAppData(): Promise<AppDataType | Error> {
    // Request update app data
    return new Promise((resolve, reject) => {
      setLoading(true);
      coreSocket.emit("app:data:get", (data) => {
        setLoading(false);
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

  const profiles = useProviderProfiles(appData?.profiles);
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

  const ready = useMemo(() => {
    return (
      Boolean(config) &&
      Boolean(plugins) &&
      Boolean(devices) &&
      Boolean(profiles)
    );
  }, [config, plugins, devices, profiles]);

  return (
    <AppContext.Provider
      value={{
        connected,
        connecting,
        loading,
        ready,
        isElectron,
        config,
        devices,
        profiles,
        plugins,
        activePlugins,
        intl,

        connect,
        requestAppData,
      }}
    >
      {connecting ? (
        <AppConnectingView />
      ) : error ? (
        <AppErrorView error={error} />
      ) : ready ? (
        <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
      ) : (
        <AppLoadingView />
      )}
    </AppContext.Provider>
  );
}
