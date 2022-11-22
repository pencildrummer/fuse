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
}

export namespace Device {
  export interface DeviceInterface {
    id: string;
    name: string;
    port: string;
    baudrate: number;

    profileId: string;
    profile: Device.ProfileInterface;

    serialNumber: string;
    vendorId: string;
    productId: string;
  }
}

export namespace Device {
  export type Type = "fdm_printer" | "msla_printer" | "cnc" | "laser";
  export type FirmwareType = "marlin" | "grbl";
  export type ConnectionType = "serial";

  export interface ProfileInterface {
    id: string;
    type: Device.Type;
    brand: string;
    model: string;

    firmware: Device.FirmwareType;
    connection: Device.ConnectionType;

    // This should be added only for a ProfileInterface generic type when .type is FDMPrinter
    /*"volume": {
    "width": 100000,
    "height": 600,
    "depth": 200,
    "formFactor": "rectangular",
    "origin": "lower-left"
  },
  "bed": {
    "heated": true
  },
  "gCodeVersion": "marlin",
  "xAxis": {
    "name": "x",
    "maxSpeed": 6000
  },
  "yAxis": {
    "name": "y",
    "maxSpeed": 6000
  },
  "zAxis": {
    "name": "z",
    "maxSpeed": 3000
  },
  "extruders": [
    {
      "nozzleSize": "0.4",
      "minNozzleSize": "0.4",
      "maxNozzleSize": "0.4",
      "axis": {
        "name": "z",
        "maxSpeed": 3000
      }
    }
  ]*/
  }
}
