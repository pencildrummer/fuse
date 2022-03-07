import 'tailwindcss/tailwind.css'
import '@fuse-labs/core-ui/styles/global.css'
import { useEffect, useState } from 'react'
import { AppProvider, ClientPluginManager, coreSocket } from '@fuse-labs/core-client'
import { AppLoader } from '@fuse-labs/core-ui'
import { TerminalClientPlugin } from '@fuse-labs/terminal'
import * as messages from './../../lang/index.js'
import Head from 'next/head'
import pkg from '../../package.json'

// TODO - Move into a _plugin.js file or something
ClientPluginManager.registerPlugin('@fuse-labs/terminal', TerminalClientPlugin)

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
