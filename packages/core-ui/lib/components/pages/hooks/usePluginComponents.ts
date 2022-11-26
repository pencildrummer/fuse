import { useMemo } from "react";
import get from "lodash-es/get";

export default function usePluginComponents(plugin, keyPath) {
  // Can be moved into DeviceManager intialization? Or leave as a hook to be used when needed instead of loading every component at init
  return useMemo(() => {
    let components = plugin.components();
    return get(components, keyPath, false);
  }, [plugin, keyPath]);
}
