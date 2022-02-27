import Head from 'next/head'
import React, { useContext } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'
import useProviderDevices from './hooks/useProviderDevices'
import useProviderPlugins from './hooks/useProviderPlugins'
import useProviderProfiles from './hooks/useProviderProfiles'

export const AppContext = React.createContext()

export default function AppProvider({
  devices: fetchedDevices,
  profiles: fetchedProfiles,
  plugins: fetchedPlugins,
  locale = 'en',
  ...props
}) {

  const profiles = useProviderProfiles(fetchedProfiles)
  const plugins = useProviderPlugins(fetchedPlugins)
  const devices = useProviderDevices(fetchedDevices)

  return <AppContext.Provider value={{
    devices,
    profiles,
    plugins,
  }}>

    <Head>
      <title>Fuse</title>
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'"></meta>
    </Head>
    <IntlProvider defaultLocale='en' locale={locale} messages={messages[locale]}>
      {props.children}
    </IntlProvider>
  </AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx)
    throw new Error('useAppContext can only be used inside an AppProvider')
    return ctx
}