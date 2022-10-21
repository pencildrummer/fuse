import { ClientPlugin } from "@fuse-labs/core-client";
import { TemperatureWidget } from "../components";
import PrinterTemperaturePage from "../pages/index";
import { BarChartIcon } from "@fuse-labs/core-ui";

export default class MarlinTemperatureClientPlugin extends ClientPlugin {
  get icon() {
    return BarChartIcon;
  }

  deviceComponents() {
    return {
      page: {
        // Add widget to the device home page
        home: TemperatureWidget,
        // The specifi device/plugin page
        plugin: PrinterTemperaturePage,
      },
    };
  }
}
