import { ToggleGroup, CNCIcon, FDMPrinterIcon, LaserIcon, MSLAPrinterIcon } from "@fuse-labs/core-ui";
import { useEffect, useState } from "react";

export default function DeviceProfilePickerTypeFilter({
  defaultValue,
  onChange,
}) {
  const [type, setType] = useState(defaultValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(_ => onChange?.(type), [type])

  return (
    <ToggleGroup value={type} onValueChange={v => setType(v?.length ? v : null)} className="flex-none">
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
  )
}