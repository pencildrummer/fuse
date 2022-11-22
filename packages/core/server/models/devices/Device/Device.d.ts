import { Device as CoreDevice } from "@fuse-labs/types";
import { DeviceNamespace } from "../../../socket-server.js";
import { Connection } from "../../index.js";
export declare const DEVICE_SCHEMA: import("yup/lib/object.js").OptionalObjectSchema<{
    id: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    name: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    port: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    baudrate: import("yup/lib/number.js").RequiredNumberSchema<number, import("yup/lib/types.js").AnyObject>;
    profileId: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    serialNumber: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    vendorId: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    productId: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
}, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<{
    id: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    name: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    port: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    baudrate: import("yup/lib/number.js").RequiredNumberSchema<number, import("yup/lib/types.js").AnyObject>;
    profileId: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    serialNumber: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    vendorId: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    productId: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
}>>;
export default class Device implements CoreDevice.DeviceInterface {
    id: string;
    name: string;
    portPath: string;
    baudrate: number;
    profileId: string;
    profile: CoreDevice.Profile.BaseInterface;
    serialNumber: string;
    vendorId: string;
    productId: string;
    connection: Connection;
    private controller;
    /**
     * The Socket.io namespace corresponding to this device
     */
    get namespace(): DeviceNamespace;
    private _namespace;
    get path(): string;
    constructor(filePathOrData: string | Omit<CoreDevice.DataType, "id">);
    save(): void;
    update(data: any): void;
    delete(): void;
    /**
     * PRIVATE
     */
    initDeviceFromPath(filePath: string): void;
    private initDeviceFromData;
    private fillDeviceWithData;
    /**
     * Configure device with necessary properties
     */
    private configureDevice;
    /**
     * Manually convert Device instance in storable JSON.
     * @returns JSON data to be stored in file.
     */
    toJSON(): {
        id: string;
        name: string;
        profileId: string;
        profile: CoreDevice.Profile.BaseInterface;
        port: string;
        baudrate: number;
        serialNumber: string;
        vendorId: string;
        productId: string;
    };
}
//# sourceMappingURL=Device.d.ts.map