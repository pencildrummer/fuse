import { Device } from "@fuse-labs/types";
import ClientDeviceProfile from "./ClientDeviceProfile";

export default class ClientLaserDeviceProfile
  extends ClientDeviceProfile
  implements Device.Profile.LaserInterface {}
