import React, { useEffect, useMemo } from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { AppContext } from "../../hooks/useAppContext.js";
import useProviderConfig from "../../hooks/useProviderConfig.js";
import useProviderDevices from "../../hooks/useProviderDevices.js";
import useProviderPlugins from "../../hooks/useProviderPlugins.js";
import useProviderProfiles from "../../hooks/useProviderProfiles.js";
import AppLoadingView from "./AppLoadingView/AppLoadingView.jsx";
import isElectron from "is-electron";

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
  const profiles = useProviderProfiles(fetchedProfiles);

  const plugins = useProviderPlugins(fetchedPlugins);
  const activePlugins = useMemo(
    (_) => plugins?.filter((p) => p.active),
    [plugins]
  );

  useEffect(
    (_) => {
      console.log("Changed plugins in AppContext", plugins);
    },
    [plugins]
  );

  const devices = useProviderDevices(fetchedDevices);

  const config = useProviderConfig(fetchedConfig);

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
