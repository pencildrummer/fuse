import socket from 'lib/client/socket'
import React, { useContext, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'

export const AppContext = React.createContext()

export default function AppProvider({
  appData,
  ...props
}) {

  const locale = 'en'

  const [devices, setDevices] = useState(appData?.devices)

  useEffect(_ => {
		// Add socket listener for newly created device
		socket.on('core.devices.added', (device) => {
      setDevices(devices => [...devices, device])
		})
	}, [])

  return <AppContext.Provider value={{
    ...appData,
    devices
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