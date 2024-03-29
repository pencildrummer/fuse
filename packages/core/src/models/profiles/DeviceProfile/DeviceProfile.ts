import path from "path";
import { SYSTEM_BASE_PATH } from "../../../constants.js";
import { pathCase } from "@fuse-labs/shared-utils";
import { object, ObjectSchema, SchemaOf, string } from "yup";
import { Connection, Device as CoreDevice } from "@fuse-labs/types";
import { logger } from "../../../logger.js";

// TODO: Make validation schema based on DeviceProfile class? Or some TS interface already in place
export const DEVICE_PROFILE_SCHEMA = object({
  id: string().required(),
  type: string().required(), // Add validation for supported types
  brand: string().required(),
  model: string().required(),

  firmware: string().required(),
  connectionType: string().required(), // Add validation for available types of connection
});

export default class DeviceProfile implements CoreDevice.Profile.BaseInterface {
  id: string;
  type: CoreDevice.Profile.Type;
  brand: string;
  model: string;

  firmware: CoreDevice.FirmwareType;

  connectionType: Connection.Type;

  /** Storage path relative to project root */
  get path() {
    let pathBrand = pathCase(this.brand);
    let pathModel = pathCase(this.model);
    return path.join(
      SYSTEM_BASE_PATH,
      "profiles",
      pathBrand,
      pathModel + ".json"
    );
  }

  /** Costructor using JSON parsed content */
  constructor(data: CoreDevice.Profile.BaseDataType) {
    if (this.constructor == DeviceProfile) {
      throw new Error(
        "DeviceProfile cannot be instantiated, is in an abstract class"
      );
    }

    // Manually set ID on creation
    data.id = [pathCase(data.brand), pathCase(data.model)].join(".");
    // Validate data and set on instance
    try {
      let profileData = DEVICE_PROFILE_SCHEMA.validateSync(data, {
        stripUnknown: true,
      });
      Object.assign(this, profileData);
    } catch (error) {
      logger.error("Error creating DeviceProfile with data:");
      logger.debug(data);
      logger.error(error.message);
    }
  }

  //
  save() {
    // TODO - Implement for server side use only
  }
}
