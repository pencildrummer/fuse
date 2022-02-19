import PrinterDevicePage from './PrinterDevicePage'
import CNCDevicePage from './CNCDevicePage'
import DevicePage from './DevicePage'

// Returns which type of page (in pages-layout) to use based on device type
export default function getDevicePageComponent(deviceType) {
  switch (deviceType) {
    case 'fdm_printer':   return PrinterDevicePage
    case 'cnc':           return CNCDevicePage
    default:              return DevicePage
  }
}