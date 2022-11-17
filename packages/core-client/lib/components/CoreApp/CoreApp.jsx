import { useEffect, useState } from "react";
import { coreSocket } from "../../socket";
import AppProvider from "../AppProvider/AppProvider";
import * as messages from "../../../lang";

export default function CoreApp({ Component, pageProps }) {
  const locale = "en";

  return (
    <AppProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
