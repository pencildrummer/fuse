import { useAppContext } from "components/AppProvider/AppProvider";
import { useMemo } from "react";

// TODO - Maybe create a plugin class for client to be used instead of using React specific hook?
export default function usePlugin(nameOrURL) {
  const { plugins } = useAppContext()
  // Get the requested plugin from URL,
  // find first for configured 'pagesUrl' in plugin package.json otherwise fallback finding plugin name with same url requested
  return useMemo(_ => plugins.find(plugin => plugin.fuse.url == nameOrURL || plugin.name === nameOrURL), [plugins])
}