import { Connection, Device as CoreDevice } from "@fuse-labs/types";
export declare const DEVICE_PROFILE_SCHEMA: import("yup/lib/object.js").OptionalObjectSchema<{
    id: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    type: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    brand: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    model: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    path: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    firmware: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    connectionType: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
}, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<{
    id: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    type: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    brand: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    model: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    path: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    firmware: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    connectionType: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
}>>;
export default class DeviceProfile implements CoreDevice.Profile.BaseInterface {
    id: string;
    type: CoreDevice.Profile.Type;
    brand: string;
    model: string;
    firmware: CoreDevice.FirmwareType;
    connectionType: Connection.Type;
    /** Storage path relative to project root */
    get path(): string;
    /** Costructor using JSON parsed content */
    constructor(data: CoreDevice.Profile.BaseDataType);
    save(): void;
}
//# sourceMappingURL=DeviceProfile.d.ts.map