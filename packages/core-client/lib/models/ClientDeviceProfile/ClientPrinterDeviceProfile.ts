import { Device } from "@fuse-labs/types";
import ClientDeviceProfile from "./ClientDeviceProfile";

export default class ClientPrinterDeviceProfile
  extends ClientDeviceProfile
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
}
