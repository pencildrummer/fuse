import useAppContext from "./useAppContext";
import { useMemo } from "react";

// TODO - Maybe create a plugin class for client to be used instead of using React specific hook?
export default function usePlugin(nameOrURL: string) {
  const { plugins } = useAppContext();
  // Get the requested plugin from URL,
  // find first for configured 'pagesUrl' in plugin package.json otherwise fallback finding plugin name with same url requested
  return useMemo(
    () =>
      plugins.find(
        (plugin) => plugin.url == nameOrURL || plugin.name === nameOrURL
      ),
    [nameOrURL, plugins]
  );
}
