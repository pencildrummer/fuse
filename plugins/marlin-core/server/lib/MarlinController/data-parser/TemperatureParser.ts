import { DataParser } from "@fuse-labs/core";

type TemperatureData = {
  current: number;
  target: number;
};

type TemperatureInfo = {
  extruders?: any[];
  bed?: TemperatureData;
  bedPower?: Boolean;
  chamber?: TemperatureData;
  hotend?: boolean;
  pindaV2?: TemperatureData;
  ambient?: TemperatureData;
};

export default class TemperatureParser extends DataParser<TemperatureInfo> {
  match(data) {
    return data.startsWith("ok T") || data.startsWith(" T");
  }

  parse(data) {
    // Remove spaces between /
    let temperatureParts = data
      .replaceAll(" /", "/")
      .split(" ")
      .map((p) => p.trim().split(":"));

    let item: TemperatureInfo = {};

    // Parse temperature

    temperatureParts.forEach((part) => {
      let key = part[0];
      let value = part[1];

      if (key.slice(0, 1) === "T") {
        // Parse temperature
        let extruderIndex = parseInt(key.length > 1 ? key.slice(1) : 0);
        item[`extruder-${extruderIndex}`] = this._getCurrentAndTarget(value);
      } else {
        switch (key) {
          // Bed temperature
          case "B":
            item.bed = this._getCurrentAndTarget(value);
            break;
          // Bed power (greater than 0 if powered)
          case "B@":
            item.bedPower = Boolean(value);
            break;
          // Chamber temperature
          case "C":
            item.chamber = this._getCurrentAndTarget(value);
            break;
          // Hotend power (greater than 0 if powered)
          case "@":
            item.hotend = Boolean(value);
            break;
          // PINDAV2
          case "P":
            item.pindaV2 = this._getCurrentAndTarget(value);
            break;
          // Ambient
          case "A":
            item.ambient = this._getCurrentAndTarget(value);
            break;
          case "T":
            // Ignore, we parse it before
            break;
          default:
            console.warn(
              `Unsupported key "${key}" in ${this.constructor.name}`
            );
            break;
        }
      }
    });

    return item;
  }

  _getCurrentAndTarget(value): TemperatureData {
    let values = value.split("/");
    let current = values[0];
    let target = values.length > 1 ? values[1] : null;
    return {
      current,
      target,
    };
  }
}
