import React, { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import useProviderPlugins from '../../hooks/useProviderPlugins.js'
import useProviderDevices from '../../hooks/useProviderDevices.js'
import useProviderProfiles from '../../hooks/useProviderProfiles.js'
import { AppContext } from '../../hooks/useAppContext.js'

export default function AppProvider({
  devices: fetchedDevices,
  profiles: fetchedProfiles,
  plugins: fetchedPlugins,
  locale = 'en',
  messages,
  ...props
}) {

  const profiles = useProviderProfiles(fetchedProfiles)
  
  const plugins = useProviderPlugins(fetchedPlugins)
  // TODO - Improve, use ClientPluginManager method instead
  const activePlugins = useMemo(_ => plugins?.filter(p => p.active), [plugins])

  const devices = useProviderDevices(fetchedDevices)

  return <AppContext.Provider value={{
    devices,
    profiles,
    plugins,
    activePlugins,
  }}>
    <IntlProvider defaultLocale='en' locale={locale} messages={messages}>
      {props.children}
    </IntlProvider>
  </AppContext.Provider>
}