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

  // TODO: MAbe not the best bay, at every render cycle it will be regenerated
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

  return (
    <AppContext.Provider
      value={{
        devices,
        profiles,
        plugins,
        activePlugins,
        config,
        intl,
      }}
    >
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </AppContext.Provider>
  );
}
