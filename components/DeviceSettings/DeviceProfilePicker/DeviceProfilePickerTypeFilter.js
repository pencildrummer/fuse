import { ToggleGroup } from "plugins/@fuse-labs/core-ui";
import CNCIcon from "plugins/@fuse-labs/core-ui/components/icons/CNCIcon";
import FDMPrinterIcon from "plugins/@fuse-labs/core-ui/components/icons/FDMPrinterIcon";
import LaserIcon from "plugins/@fuse-labs/core-ui/components/icons/LaserIcon";
import MSLAPrinterIcon from "plugins/@fuse-labs/core-ui/components/icons/MSLAPrinterIcon";
import { useEffect, useState } from "react";

export default function DeviceProfilePickerTypeFilter({
  defaultValue,
  onChange,
}) {
  const [type, setType] = useState(defaultValue)
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