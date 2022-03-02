import DeviceForm from "../DeviceForm/DeviceForm";
import { useState } from "react";
import ListDeviceWizardStep from "./ListDevicesWizardStep/ListDevicesWizardStep";

export default function AddDeviceWizard({
  device,
  props
}) {
  const [selectedDevice, setSelectedDevice] = useState(device)
  if (selectedDevice) return <DeviceForm device={selectedDevice} />
  return <ListDeviceWizardStep onSelectDevice={setSelectedDevice}/>
}