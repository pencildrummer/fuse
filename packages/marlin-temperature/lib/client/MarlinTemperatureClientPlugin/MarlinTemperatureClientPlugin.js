import { ClientPlugin } from "@fuse-labs/core-client";
import { TemperatureWidget } from "../components";
import PrinterTemperaturePage from '../../pages/index';

export default class MarlinTemperatureClientPlugin extends ClientPlugin {
  
  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: TemperatureWidget,
        // The specifi device/plugin page 
        plugin: PrinterTemperaturePage
      }
    }
  }

}