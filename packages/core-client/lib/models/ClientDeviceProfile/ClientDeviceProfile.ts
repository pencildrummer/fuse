import { Connection, Device as CoreDevice } from "@fuse-labs/types";

export default class ClientDeviceProfile
  implements CoreDevice.Profile.BaseInterface
{
  id: string;
  type: CoreDevice.Profile.Type;
  brand: string;
  model: string;

  firmware: CoreDevice.FirmwareType;

  connectionType: Connection.Type;
  path: string;
}
