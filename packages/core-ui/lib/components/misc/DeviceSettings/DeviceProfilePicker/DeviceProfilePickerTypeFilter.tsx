import { Device } from "@fuse-labs/types";
import { useEffect, useState } from "react";
import {
  CNCIcon,
  FDMPrinterIcon,
  LaserIcon,
  MSLAPrinterIcon,
} from "../../../icons";
import { ToggleGroup } from "../../../shared";

type DeviceProfilePickerTypeFilterProps = {
  onChange: (value: Device.Profile.Type) => void;
  defaultValue?: Device.Profile.Type;
};

export default function DeviceProfilePickerTypeFilter({
  defaultValue,
  onChange,
}: DeviceProfilePickerTypeFilterProps) {
  const [type, setType] = useState(defaultValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChange?.(type), [type]);

  return (
    <ToggleGroup
      value={type}
      onValueChange={(v) => setType(v?.length ? v : null)}
      className="flex-none"
    >
      <ToggleGroup.Item value="fdm_printer" className="rounded-md">
        <FDMPrinterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="msla_printer" className="rounded-md">
        <MSLAPrinterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="cnc" className="rounded-md">
        <CNCIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="laser" className="rounded-md">
        <LaserIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}
