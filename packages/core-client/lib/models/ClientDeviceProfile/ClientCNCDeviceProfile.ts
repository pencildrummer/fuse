import { Device } from "@fuse-labs/types";
import ClientDeviceProfile from "./ClientDeviceProfile";

export default class ClientCNCDeviceProfile
  extends ClientDeviceProfile
  implements Device.Profile.CNCInterface {}
