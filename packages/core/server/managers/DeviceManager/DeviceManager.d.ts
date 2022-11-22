import Device from "../../models/devices/Device/Device.js";
import { Device as CoreDevice } from "@fuse-labs/types";
declare class DeviceManager {
    private _devices;
    get devices(): Device[];
    _initialized: boolean;
    constructor();
    init(): void;
    getDevice(deviceId: Device["id"]): Device;
    addDevice(data: Omit<CoreDevice.DataType, "id">): Device;
    updateDevice(deviceId: Device["id"], data: CoreDevice.DataType.Mutable): Device;
    removeDevice(deviceId: Device["id"]): void | Device;
}
declare class Singleton {
    private static sharedInstance;
    constructor();
    static get shared(): DeviceManager;
}
export default Singleton;
//# sourceMappingURL=DeviceManager.d.ts.map