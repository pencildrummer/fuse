import * as messages from "../../../lang";
import AppProvider from "../AppProvider/AppProvider";

export default function CoreApp({ Component, pageProps }) {
  const locale = "en";

  return (
    <AppProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
