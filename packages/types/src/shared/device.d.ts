import { Connection } from "./connection";

export namespace Device {
  export interface DataType {
    readonly id: string;
    name: string;
    port: string;
    baudrate: number;
    profileId: string;

    readonly serialNumber?: string;
    readonly vendorId?: string;
    readonly productId?: string;
  }

  namespace DataType {
    export type ImmutableProps =
      | "id"
      | "profile"
      | "serialNumber"
      | "vendorId"
      | "productId";

    export interface Immutable extends Readonly<DataType> {}
    export interface Mutable extends Omit<DataType, ImmutableProps> {
      readonly id: string;
    }
  }

  export interface DeviceInterface {
    id: string;
    name: string;
    port: number;
    baudrate: number;

    profileId: string;
    profile: Device.Profile.BaseInterface;

    serialNumber: string;
    vendorId: string;
    productId: string;
  }

  export type FirmwareType = "marlin" | "grbl";

  export namespace Profile {
    export type Type = "fdm_printer" | "msla_printer" | "cnc" | "laser";

    // Base generic profile
    export type BaseDataType = {
      id: string;
      type: Device.Profile.Type;
      brand: string;
      model: string;

      firmware: Device.FirmwareType;
      connectionType: Connection.Type;
    };

    namespace Base {
      type Axis = {
        name: string;
        maxSpeed: number;
      };
    }
    export interface BaseInterface extends BaseDataType {}

    // GCode device profile
    interface GCodeCapableProfileDevice {}
    namespace GCodeCapableDeviceProfile {
      type GCodeVersion = "marlin";
    }

    // FDM Printer profile
    export type FDMPrinterDataType = BaseDataType & {
      volume: FDMPrinter.Volume;
      bed: FDMPrinter.Bed;
      gCodeVersion: GCodeCapableDeviceProfile.GCodeVersion;
      xAxis: Base.Axis;
      yAxis: Base.Axis;
      zAxis: Base.Axis;
      extruders: FDMPrinter.Extruder[];
    };

    namespace FDMPrinter {
      type Volume = {
        width: number;
        height: number;
        depth: number;
        formFactor: "rectangular" | "oval";
        origin:
          | "lower-left"
          | "lower-right"
          | "top-left"
          | "top-right"
          | "center";
      };

      type Bed = {
        heated: boolean;
      };

      type Extruder = {
        nozzleSize: number;
        minNozzleSize: number;
        maxNozzleSize: number;
        axis: Base.Axis;
      };
    }

    export interface FDMPrinterInterface extends FDMPrinterDataType {}
  }

  // Controller

  export interface ControllerInterface {}
  namespace Controller {}
}
