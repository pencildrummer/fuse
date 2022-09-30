import React, { useEffect, useMemo } from "react";
import { RawIntlProvider, createIntl, createIntlCache } from "react-intl";
import useProviderPlugins from "../../hooks/useProviderPlugins.js";
import useProviderDevices from "../../hooks/useProviderDevices.js";
import useProviderProfiles from "../../hooks/useProviderProfiles.js";
import { AppContext } from "../../hooks/useAppContext.js";
import useProviderConfig from "../../hooks/useProviderConfig.js";

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
      console.log(config);
      console.log("Config", Boolean(config));
      console.log("plugins", Boolean(plugins));
      console.log("devices", Boolean(devices));
      console.log("profiles", Boolean(profiles));
      return (
        Boolean(config) &&
        Boolean(plugins) &&
        Boolean(devices) &&
        Boolean(profiles)
      );
    },
    [config, plugins, devices, profiles]
  );

  useEffect(
    (_) => {
      console.log("Changed app data", isReady);
    },
    [isReady]
  );

  return (
    <AppContext.Provider
      value={{
        isReady,
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
}
