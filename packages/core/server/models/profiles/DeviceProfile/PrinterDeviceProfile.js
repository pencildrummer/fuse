import { array, object, string } from "yup";
import DeviceProfile from "./DeviceProfile.js";
export const PRINTER_DEVICE_PROFILE_SCHEMA = object({
    volume: object().required(),
    bed: object().required(),
    extruders: array().required(),
    gCodeVersion: string().required(),
    beginGCode: string().optional(),
    endGCode: string().optional(),
    xAxis: object().required(),
    yAxis: object().required(),
    zAxis: object().required(),
});
export default class PrinterDeviceProfile extends DeviceProfile {
    constructor(data) {
        super(data);
        let printerDeviceProfileData = PRINTER_DEVICE_PROFILE_SCHEMA.validateSync(data);
        Object.assign(this, printerDeviceProfileData);
        // const { volume, bed, extruders, xAxis, yAxis, zAxis, gCodeVersion, ...rest } = params
        // super(rest)
        // this.volume = volume
        // this.bed = bed
        // this.extruders = extruders
        // this.xAxis = xAxis
        // this.yAxis = yAxis
        // this.zAxis = zAxis
        // this.gCodeVersion = gCodeVersion
    }
}
