import 'tailwindcss/tailwind.css'
import '@fuse-labs/core-ui/styles/global.css'
import { useEffect, useState } from 'react'
import { AppProvider, ClientPluginManager, coreSocket } from '@fuse-labs/core-client'
import { AppLoader } from '@fuse-labs/core-ui'
import TerminalClientPlugin from '@fuse-labs/terminal/client'
import MarlinCoreClientPlugin from '@fuse-labs/marlin-core/client'
import MarlinTemperatureClientPlugin from '@fuse-labs/marlin-temperature/client'
import * as messages from './../../lang/index.js'
import Head from 'next/head'
import pkg from '../../package.json'

// TODO - Move into a _plugin.js file or something like the manager on the server side
ClientPluginManager.registerPlugin('@fuse-labs/terminal', TerminalClientPlugin)
ClientPluginManager.registerPlugin('@fuse-labs/marlin-core', MarlinCoreClientPlugin)
ClientPluginManager.registerPlugin('@fuse-labs/marlin-temperature', MarlinTemperatureClientPlugin)

function MyApp({ Component, pageProps }) {

  const locale = 'en'

  const [appData, setAppData] = useState()

  useEffect(_ => {
    coreSocket.connect()
    coreSocket.on('connect_error', err => console.error('Error connecting to coreSocket', err))
    coreSocket.emit('app:data', (data) => {
      if (data) {
        setAppData(data)
      } else {
        console.error('Error retrieving app data')
      }
    })
  }, [])

  return (
    <>
    <Head>
      <title>Fuse • v.{pkg.version} </title>
    </Head>
    {appData ? (
      <AppProvider {...appData} locale={locale} messages={messages[locale]}>
        <Component {...pageProps} />
      </AppProvider>
    ) : (
      <AppLoader />
    )} 
    </>
  )
}

export default MyApp
