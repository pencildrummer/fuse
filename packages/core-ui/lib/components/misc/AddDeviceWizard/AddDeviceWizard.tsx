import DeviceForm from "../DeviceForm/DeviceForm";
import { useState } from "react";
import ListDeviceWizardStep from "./ListDevicesWizardStep/ListDevicesWizardStep";

type Props = {
  device?: any; // TODO: Device type
};
export default function AddDeviceWizard({ device }: Props) {
  const [selectedDevice, setSelectedDevice] = useState(device);
  if (selectedDevice) return <DeviceForm device={selectedDevice} />;
  return <ListDeviceWizardStep onSelectDevice={setSelectedDevice} />;
}
