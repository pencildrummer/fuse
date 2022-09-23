import 'tailwindcss/tailwind.css'
import '../global.css'
// import '@fuse-labs/core-ui/core-ui.css'
import { useEffect, useState } from 'react'
import { AppProvider, ClientPluginManager, coreSocket } from '@fuse-labs/core-client'
import { AppLoader } from '@fuse-labs/core-ui'
import * as messages from '../../lang/index.js'
import Head from 'next/head'
import pkg from '../../package.json'

// Import Electron specific styles
import '../electron.css'

// These imports should be dynamic, loaded runtime, Fuse will not come with plugin pre-bundled in the main binary
// import TerminalClientPlugin from '@fuse-labs/terminal/client'
// import MarlinCoreClientPlugin from '@fuse-labs/marlin-core/client'
// import MarlinTemperatureClientPlugin from '@fuse-labs/marlin-temperature/client'
// import MarlinSettingsClientPlugin from '@fuse-labs/marlin-settings/client'
// import FileManagerClientPlugin from '@fuse-labs/file-manager/client'

// TODO - Move into a _plugin.js file or something like the manager on the server side, some sort of install process for plugins
// ClientPluginManager.registerPlugin('@fuse-labs/terminal', TerminalClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-core', MarlinCoreClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-temperature', MarlinTemperatureClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/file-manager', FileManagerClientPlugin)
// ClientPluginManager.registerPlugin('@fuse-labs/marlin-settings', MarlinSettingsClientPlugin)

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
      <title>{`Fuse • v.${pkg.version}`}</title>
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
