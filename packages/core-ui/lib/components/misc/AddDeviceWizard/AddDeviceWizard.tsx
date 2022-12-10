import DeviceForm from "../DeviceForm/DeviceForm";
import { useEffect, useState } from "react";
import ListDeviceWizardStep from "./ListDevicesWizardStep/ListDevicesWizardStep";
import { Device as CoreDevice } from "@fuse-labs/types";

export default function AddDeviceWizard({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [step, setStep] = useState<"list" | "form">("list");
  const [selectedDevice, setSelectedDevice] =
    useState<CoreDevice.DataType | null>(null);

  useEffect(() => {
    if (selectedDevice) setStep("form");
  }, [selectedDevice]);

  switch (step) {
    case "list":
      return <ListDeviceWizardStep onSelectDevice={setSelectedDevice} />;
    case "form":
      if (!selectedDevice) throw Error("Missing predefined connected device");
      return (
        <DeviceForm
          device={selectedDevice}
          onDeviceCreated={() => {
            console.log("should close wizard after creation");
            onComplete?.();
          }}
        />
      );
  }

  return null;
}
