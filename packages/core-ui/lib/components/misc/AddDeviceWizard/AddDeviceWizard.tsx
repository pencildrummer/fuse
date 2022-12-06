import DeviceForm from "../DeviceForm/DeviceForm";
import { useState } from "react";
import ListDeviceWizardStep from "./ListDevicesWizardStep/ListDevicesWizardStep";
import { Device as CoreDevice } from "@fuse-labs/types";

export default function AddDeviceWizard() {
  const [selectedDevice, setSelectedDevice] =
    useState<CoreDevice.DataType | null>(null);
  if (selectedDevice) return <DeviceForm device={selectedDevice} />;
  return <ListDeviceWizardStep onSelectDevice={setSelectedDevice} />;
}
