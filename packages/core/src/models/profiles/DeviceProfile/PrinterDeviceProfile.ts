import { Device } from "@fuse-labs/types";
import { array, object, string } from "yup";
import DeviceProfile from "./DeviceProfile.js";

export const PRINTER_DEVICE_PROFILE_SCHEMA = object({
  volume: object().required(),
  bed: object().required(),
  extruders: array().required(),
  gCodeVersion: string().required(),
  beginGCode: string().optional(),
  endGCode: string().optional(),
  xAxis: object().required(),
  yAxis: object().required(),
  zAxis: object().required(),
});

export default class PrinterDeviceProfile
  extends DeviceProfile
  implements Device.Profile.FDMPrinterInterface
{
  volume: Device.Profile.FDMPrinter.Volume;
  bed: Device.Profile.FDMPrinter.Bed;
  gCodeVersion: Device.Profile.GCodeCapableProfileDevice.GCodeVersion;
  xAxis: Device.Profile.Base.Axis;
  yAxis: Device.Profile.Base.Axis;
  zAxis: Device.Profile.Base.Axis;
  extruders: Device.Profile.FDMPrinter.Extruder[];

  beginGCode: string;
  endGCode: string;

  constructor(data: Device.Profile.FDMPrinterDataType) {
    super(data);

    let printerDeviceProfileData =
      PRINTER_DEVICE_PROFILE_SCHEMA.validateSync(data);
    Object.assign(this, printerDeviceProfileData);

    // const { volume, bed, extruders, xAxis, yAxis, zAxis, gCodeVersion, ...rest } = params
    // super(rest)
    // this.volume = volume
    // this.bed = bed
    // this.extruders = extruders
    // this.xAxis = xAxis
    // this.yAxis = yAxis
    // this.zAxis = zAxis
    // this.gCodeVersion = gCodeVersion
  }
}
