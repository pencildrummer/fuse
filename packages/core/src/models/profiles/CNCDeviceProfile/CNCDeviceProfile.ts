import { Device } from "@fuse-labs/types";
import DeviceProfile from "../DeviceProfile/DeviceProfile.js";

export default class CNCDeviceProfile
  extends DeviceProfile
  implements Device.Profile.CNCInterface
{
  constructor(data: Device.Profile.CNCDataType) {
    super(data);
  }
}
