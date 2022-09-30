import { useEffect, useState } from "react";
import { coreSocket } from "../../socket";
import AppProvider from "../AppProvider/AppProvider";
import * as messages from "../../../lang";

export default function CoreApp({ Component, pageProps }) {
  const locale = "en";

  const [appData, setAppData] = useState();

  useEffect((_) => {
    coreSocket.connect();
    coreSocket.on("connect_error", (err) =>
      console.error("Error connecting to coreSocket", err)
    );
    coreSocket.emit("app:data", (data) => {
      if (data) {
        setAppData(data);
        console.log("Updated app data", data);
      } else {
        console.error("Error retrieving app data");
      }
    });
  }, []);

  return (
    <AppProvider {...appData} locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </AppProvider>
  );
}
