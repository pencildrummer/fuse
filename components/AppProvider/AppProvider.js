import React, { useContext } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'

export const AppContext = React.createContext()

export default function AppProvider({
  appData,
  ...props
}) {

  const locale = 'en'

  return <AppContext.Provider value={{
    ...appData
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