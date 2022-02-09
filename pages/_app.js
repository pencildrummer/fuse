import 'tailwindcss/tailwind.css'
import '../components/global.css'
import { IntlProvider } from 'react-intl'
import * as messages from '../lang/index'

function MyApp({ Component, pageProps }) {
  const locale = 'en'
  return <IntlProvider defaultLocale='en' locale={locale} messages={messages[locale]}>
    <Component {...pageProps} />
  </IntlProvider>
}

export default MyApp
