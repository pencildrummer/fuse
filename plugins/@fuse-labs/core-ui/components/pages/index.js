import Page from "./Page/Page";
import PageTopBar from './Page/PageTopBar'
import DevicePage from "./DevicePage/DevicePage";
import PrinterDevicePage from "./PrinterDevicePage/PrinterDevicePage";
import CNCDevicePage from "./CNCDevicePage/CNCDevicePage";
import SettingPage from "./SettingPage/SettingPage";

import getDevicePageComponent from "./getDevicePageComponent";

import { useDeviceStatusListContext } from "./DevicePage/DeviceStatusListProvider";

export {
  Page,
  PageTopBar,
  DevicePage,
  PrinterDevicePage,
  CNCDevicePage,
  SettingPage,

  getDevicePageComponent,

  useDeviceStatusListContext,
}