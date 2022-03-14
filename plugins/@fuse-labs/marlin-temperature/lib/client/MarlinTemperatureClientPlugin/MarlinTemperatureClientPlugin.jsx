import { ClientPlugin } from "@fuse-labs/core-client";
import { TemperatureWidget } from "../components";

export default class MarlinTemperatureClientPlugin extends ClientPlugin {
  
  deviceComponents() {
    return {
      page: {
        home: TemperatureWidget
      }
    }
  }

}