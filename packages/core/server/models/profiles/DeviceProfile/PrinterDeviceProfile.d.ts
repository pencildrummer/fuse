import { Device } from "@fuse-labs/types";
import DeviceProfile from "./DeviceProfile.js";
export declare const PRINTER_DEVICE_PROFILE_SCHEMA: import("yup/lib/object.js").OptionalObjectSchema<{
    volume: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    bed: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    extruders: import("yup/lib/array.js").RequiredArraySchema<import("yup").AnySchema<any, any, any>, import("yup/lib/types.js").AnyObject, any[]>;
    gCodeVersion: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    beginGCode: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    endGCode: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    xAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    yAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    zAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
}, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<{
    volume: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    bed: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    extruders: import("yup/lib/array.js").RequiredArraySchema<import("yup").AnySchema<any, any, any>, import("yup/lib/types.js").AnyObject, any[]>;
    gCodeVersion: import("yup/lib/string.js").RequiredStringSchema<string, import("yup/lib/types.js").AnyObject>;
    beginGCode: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    endGCode: import("yup").StringSchema<string, import("yup/lib/types.js").AnyObject, string>;
    xAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    yAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
    zAxis: import("yup/lib/object.js").RequiredObjectSchema<import("yup/lib/object.js").ObjectShape, import("yup/lib/object.js").AnyObject, import("yup/lib/object.js").TypeOfShape<import("yup/lib/object.js").ObjectShape>>;
}>>;
export default class PrinterDeviceProfile extends DeviceProfile implements Device.Profile.FDMPrinterInterface {
    volume: Device.Profile.FDMPrinter.Volume;
    bed: Device.Profile.FDMPrinter.Bed;
    gCodeVersion: Device.Profile.GCodeCapableProfileDevice.GCodeVersion;
    xAxis: Device.Profile.Base.Axis;
    yAxis: Device.Profile.Base.Axis;
    zAxis: Device.Profile.Base.Axis;
    extruders: Device.Profile.FDMPrinter.Extruder[];
    beginGCode: string;
    endGCode: string;
    constructor(data: Device.Profile.FDMPrinterDataType);
}
//# sourceMappingURL=PrinterDeviceProfile.d.ts.map