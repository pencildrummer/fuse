import { useMemo } from "react"
import get from 'lodash-es/get'

export default function useDeviceComponents(device, keyPath) {

  // Can be moved into DeviceManager intialization? Or leave as a hook to be used when needed instead of loading every component at init
  return useMemo(_ => {
    return device?.plugins?.map(plugin => {
      if (typeof plugin.deviceComponents === 'function') {
        let components = plugin.deviceComponents(device)
        return get(components, keyPath, false)
      }
    }).filter(Boolean)
  }, [device, keyPath])

}