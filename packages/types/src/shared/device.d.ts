import { Connection } from "./connection";

export namespace Device {
  export interface DataType {
    readonly id: string;
    name: string;
    portPath: string;
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
    portPath: string;
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

      /** String identify which firmware is used on the motherboard. It will use to determine which Controller to use */
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
    interface GCodeCapableProfileDevice {
      /** Custom printer GCode to attach at the begin of the print process */
      beginGCode: string;
      /** Custom printer GCode to attach at the end of the print process */
      endGCode: string;
    }
    namespace GCodeCapableProfileDevice {
      type GCodeVersion = "marlin";
    }

    //
    // FDM Printer profile
    //

    export type FDMPrinterDataType = BaseDataType &
      GCodeCapableProfileDevice & {
        /** Print volume based on provided config width, height and depth */
        volume: FDMPrinter.Volume;
        /** The bed of the printer, size is determined by printArea */
        bed: FDMPrinter.Bed;
        /** Type of GCode used (from Cura) */
        gCodeVersion: GCodeCapableProfileDevice.GCodeVersion;
        /** X axis definition */
        xAxis: Base.Axis;
        /** Y axis definition */
        yAxis: Base.Axis;
        /** Z axis definition */
        zAxis: Base.Axis;
        /** Extruders available on this printer */
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

    // CNC profile
    export type CNCDataType = BaseDataType & {};
    namespace CNC {}
    export interface CNCInterface extends CNCDataType {}

    // Laser profile
    export type LaserDataType = BaseDataType & {};
    namespace Laser {}
    export interface LaserInterface extends LaserDataType {}
  }

  // Controller

  export interface ControllerInterface {}
  namespace Controller {}
}
