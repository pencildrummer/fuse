export type DeviceType = "fdm_printer" | "msla_printer" | "cnc" | "laser";
export type DeviceConnectionType = "serial";

export interface DeviceDataType {
  id: string;
  name: string;
  port: string;
  baudrate: number;
  profileId: string;

  serialNumber?: string;
  vendorId?: string;
  productId?: string;
}

export interface DeviceInterface {
  id: string;
  name: string;
  port: string;
  baudrate: number;

  profileId: string;
  profile: DeviceProfileInterface;

  serialNumber: string;
  vendorId: string;
  productId: string;
}

export type ImmutableDeviceDataTypeProps =
  | "id"
  | "profile"
  | "serialNumber"
  | "vendorId"
  | "productId";

export interface DeviceUpdateDataType
  extends Omit<DeviceDataType, ImmutableDeviceDataTypeProps> {
  readonly id: string;
}

export interface DeviceProfileInterface {
  id: string;
  type: DeviceType;
  brand: string;
  model: string;

  firmware: string;
  connection: DeviceConnectionType;
}
