import { titleCase } from "@fuse-labs/shared-utils";
import { Device } from "@fuse-labs/types";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import signale from "signale";
import { PROFILES_BASE_PATH, SYSTEM_BASE_PATH } from "../../constants.js";
import { logger } from "../../logger.js";
import { DeviceProfile } from "../../models/index.js";
import CNCDeviceProfile from "../../models/profiles/CNCDeviceProfile/CNCDeviceProfile.js";
import PrinterDeviceProfile from "../../models/profiles/DeviceProfile/PrinterDeviceProfile.js";
import BaseManager from "../BaseManager.js";
import getProxiedManager from "../getProxiedManager.js";

let instance: ProfileManager;

class ProfileManager extends BaseManager {
  private _profiles: { [key: string]: DeviceProfile } = {};
  get profiles() {
    return this._profiles;
  }

  constructor() {
    super();

    if (instance)
      throw new Error("Created new shared ConfigManager is not permitted");
    instance = this;

    // Automatically init
    // this.init();
  }

  init() {
    if (this._initialized)
      throw new Error("Trying to re-initialize ProfileManager");

    logger.pending("ProfileManager is initializing.. ");

    let brandDirectories = fs
      .readdirSync(PROFILES_BASE_PATH, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    this._profiles = brandDirectories.reduce((res, dir) => {
      fs.readdirSync(path.join(PROFILES_BASE_PATH, dir.name), {
        withFileTypes: true,
      })
        .filter((d) => d.isFile() && path.extname(d.name) == ".json")
        .forEach((p) => {
          let profileId = [dir.name, path.parse(p.name).name].join(".");
          res[profileId] = this._readProfile(profileId);
        });
      return res;
    }, {});

    this._initialized = true;

    logger.ready("ProfileManager is now ready!");
  }

  getProfile(profileId: DeviceProfile["id"]) {
    return this._profiles[profileId];
  }

  addProfile(profileData: Device.Profile.BaseDataType) {
    let profile;
    // Check device type
    switch (profileData.type) {
      case "fdm_printer":
        profile = new PrinterDeviceProfile(
          profileData as Device.Profile.FDMPrinterDataType
        );
        break;
      case "cnc":
        profile = new CNCDeviceProfile(
          profileData as Device.Profile.CNCDataType
        );
        break;
      default:
        throw new Error("Unsupported profile type: " + profileData.type);
    }
    // When implemented for server side use only use profile.save() instead?
    this._writeProfile(profile);
    // Return saved profile
    return profile;
  }

  updateProfile(
    id: DeviceProfile["id"],
    profileData: Device.Profile.BaseDataType
  ) {
    logger.info("Updating profile", id);
    if (!id) {
      throw new Error("Profile ID to update not provided");
    }

    let profile;
    // Check device type
    switch (profileData.type) {
      case "fdm_printer":
        profile = new PrinterDeviceProfile(
          profileData as Device.Profile.FDMPrinterDataType
        );
        break;
      case "cnc":
        profile = new CNCDeviceProfile(profileData);
        break;
      default:
        throw new Error("Unsupported profile type: " + profileData.type);
    }

    // Check id provided is the same as the profile data
    if (id != profile.id) {
      throw new Error(
        `Profile ID provided does not match profile generated data ID ${id} != ${profile.id}`
      );
    }

    // Check if profile already exists, otherwise throw error, addProfile should be used instead
    if (!fs.existsSync(path.join(process.cwd(), profile.path))) {
      throw new Error(
        `Requested profile update for profile ${profile.id} but no file found to update at path ${profile.path}`
      );
    }

    // Write profile data
    this._writeProfile(profile, true);
    return profile;
  }

  deleteProfile(profileId: DeviceProfile["id"]) {
    let profile = this.getProfile(profileId);

    if (!fs.existsSync(profile.path)) {
      throw new Error(
        `Requested deletion of profile with id ${chalk.magenta(
          profileId
        )} but no profile file is found at path ${chalk.magenta(profile.path)}`
      );
    }
    fs.unlinkSync(path.join(process.cwd(), profile.path));
    // Remove from in memory
    delete this._profiles[profile.id];
    return true;
  }

  /**
   * INTERNAL
   */

  _readProfile(profileId: DeviceProfile["id"]): DeviceProfile {
    let fileProfilePath = profileId.replace(".", path.sep);
    // Read and parse content
    let profileData = fs.readJsonSync(
      path.join(
        process.cwd(),
        SYSTEM_BASE_PATH,
        "profiles",
        fileProfilePath + ".json"
      )
    );
    // Set brand and model in title case based on path if not specifically provided in json file
    profileData.brand =
      profileData.brand || titleCase(fileProfilePath.split(path.sep)[0]);
    profileData.model =
      profileData.model || titleCase(fileProfilePath.split(path.sep).pop());

    // TODO - Validate profile structure
    let profile;
    switch (profileData.type) {
      case "fdm_printer":
        profile = new PrinterDeviceProfile(profileData);
        break;
      case "cnc":
        profile = new CNCDeviceProfile(profileData);
        break;
      default:
        throw new Error(`Unsupported profile type: ${profileData.type}`);
    }
    return profile;
  }

  _writeProfile(profile: DeviceProfile, overwrite = false) {
    let storagePath = path.join(process.cwd(), profile.path);
    // Check file already exists, prevent save
    if (!overwrite && fs.existsSync(storagePath)) {
      throw new Error(`Profile already exists: ${storagePath}`);
    }
    // Ensure file exists and directories in between
    fs.ensureFileSync(storagePath);
    // Write profile content to file
    return fs.writeFileSync(storagePath, JSON.stringify(profile, null, 2), {
      encoding: "utf-8",
    });
  }
}

const profileManager = getProxiedManager(new ProfileManager());
export default profileManager;
