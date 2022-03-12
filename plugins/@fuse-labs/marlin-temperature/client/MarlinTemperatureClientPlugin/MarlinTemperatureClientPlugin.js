import { ClientPlugin } from "@fuse-labs/core-client";
import { TemperatureWidget } from "../components";

export default class MarlinTemperatureClientPlugin extends ClientPlugin {
  
  deviceComponents() {
    console.log('Called')
    return {
      page: {
        home: TemperatureWidget
      }
    }
  }

}