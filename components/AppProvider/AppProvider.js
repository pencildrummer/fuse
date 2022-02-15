import socket from 'lib/client/socket'
import { pathCase } from 'lib/shared/strings'
import React, { useContext, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'

export const AppContext = React.createContext()

export default function AppProvider({
  appData,
  ...props
}) {

  const locale = 'en'

  const [devices, setDevices] = useState(appData?.devices || [])
  const [profiles, setProfiles] = useState(appData?.profiles || {})

  useEffect(_ => {
		// Add socket listener for newly created device
		socket.on('core.devices.added', (device) => {
      setDevices(devices => [...devices, device])
		})

    /**
     * Profiles
     */
    socket.on('core.profiles.added', (profile) => {
      // Add received new profile to in memory ones
      const brand = pathCase(profile.brand)
      setProfiles(profiles => {
        let newProfiles = {...profiles}
        newProfiles[brand] = newProfiles[brand] || []
        newProfiles[brand].push(profile)
        return newProfiles
      })
    })
	}, [])

  console.log('PROFILES', profiles)

  return <AppContext.Provider value={{
    ...appData,
    devices,
    profiles
  }}>
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