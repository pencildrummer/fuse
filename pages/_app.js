import 'tailwindcss/tailwind.css'
import '../components/global.css'
import { IntlProvider } from 'react-intl'
import dynamic from 'next/dynamic'
import * as messages from 'lang'

function MyApp({ Component, pageProps }) {
  console.log('Imported', messages)
  const locale = 'en'
  return <IntlProvider defaultLocale='en' locale={locale} messages={messages[locale]}>
    <Component {...pageProps} />
  </IntlProvider>
}

export default MyApp
