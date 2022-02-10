import AddDeviceForm from "components/AddDeviceForm/AddDeviceForm";
import { useState } from "react";
import ListDeviceWizardStep from "./ListDevicesWizardStep/ListDevicesWizardStep";

export default function AddDeviceWizard({
  device,
  props
}) {
  const [selectedDevice, setSelectedDevice] = useState(device)
  if (selectedDevice) return <AddDeviceForm device={selectedDevice} />
  return <ListDeviceWizardStep onSelectDevice={setSelectedDevice}/>
}