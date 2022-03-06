import 'tailwindcss/tailwind.css'
import '@fuse-labs/core-ui/styles/global.css'
import { useEffect, useState } from 'react'
import { AppProvider, fetcher } from '@fuse-labs/core-client'
import { AppLoader } from '@fuse-labs/core-ui'
import * as messages from './../../lang/index.js'
import Head from 'next/head'
import pkg from '../../package.json'

function MyApp({ Component, pageProps }) {

  const locale = 'en'

  const [appData, setAppData] = useState()

  useEffect(_ => {
    fetcher('/api/init').then(res => {
      setAppData(res)
    }).catch(e => {
      console.error(e)
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
