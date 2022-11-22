import { Device } from "@fuse-labs/types";
import { DeviceProfile } from "../../models/index.js";
declare class ProfileManager {
    _initialized: boolean;
    private _profiles;
    get profiles(): {
        [key: string]: DeviceProfile;
    };
    constructor();
    init(): void;
    getProfile(profileId: DeviceProfile["id"]): DeviceProfile;
    addProfile(profileData: Device.Profile.BaseDataType): any;
    updateProfile(id: DeviceProfile["id"], profileData: Device.Profile.BaseDataType): any;
    deleteProfile(profileId: DeviceProfile["id"]): boolean;
    /**
     * INTERNAL
     */
    _readProfile(profileId: DeviceProfile["id"]): DeviceProfile;
    _writeProfile(profile: DeviceProfile, overwrite?: boolean): void;
}
declare class Singleton {
    private static sharedInstance;
    constructor();
    static get shared(): ProfileManager;
}
export default Singleton;
//# sourceMappingURL=ProfileManager.d.ts.map