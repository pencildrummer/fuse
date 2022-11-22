import { Device, PluginInterface } from "@fuse-labs/types";
import { CoreSocket, DeviceSocket } from "../../../socket-server.js";
export default class Plugin implements PluginInterface {
    name: string;
    displayName: string;
    path: any;
    version: string;
    libraryName: any;
    _settings: boolean;
    get settings(): boolean;
    get url(): string;
    _hasTabs: boolean;
    get hasTabs(): boolean;
    get tabsUrl(): string;
    get hasSocket(): boolean;
    get hasDeviceSocket(): boolean;
    get active(): boolean;
    get system(): boolean;
    get deviceTypes(): Device.Profile.Type[];
    constructor(name: string, installPath: string);
    toJSON(): any;
    /**
     * Called after plugin initialization
     */
    provision(): void;
    /**
     * Socket initialization
     */
    initSocket(socket: CoreSocket): void;
    initDeviceSocket(socket: DeviceSocket): void;
}
//# sourceMappingURL=Plugin.d.ts.map