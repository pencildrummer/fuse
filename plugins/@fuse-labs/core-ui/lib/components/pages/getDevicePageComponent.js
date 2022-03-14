import PrinterDevicePage from './PrinterDevicePage/PrinterDevicePage'
import CNCDevicePage from './CNCDevicePage/CNCDevicePage'
import DevicePage from './DevicePage/DevicePage'

// Returns which type of page (in pages-layout) to use based on device type
export default function getDevicePageComponent(deviceType) {
  switch (deviceType) {
    case 'fdm_printer':   return PrinterDevicePage
    case 'cnc':           return CNCDevicePage
    default:              return DevicePage
  }
}