import 'tailwindcss/tailwind.css'
import '../components/global.css'
import AppProvider from 'components/AppProvider/AppProvider'
import { useEffect, useState } from 'react'
import fetcher from 'lib/client/fetcher'
import AppLoader from 'components/AppLoader/AppLoader'

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

  if (!appData)
    return <AppLoader />

  return <AppProvider appData={appData}>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
