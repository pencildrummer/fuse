import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import Label from "../../../core-ui/components/shared/Label/Label";
import { SelectRaw } from "../../../core-ui/components/shared/Select/Select";

export default function MarlinGCodeViewerSettingsWidget() {
  return <SettingsWidget>
    <Group className="justify-between">
      <Label htmlFor="mode">
        Display mode
      </Label>
      <SelectRaw id="mode" options={[
        { value: '2d', label: '2D' },
        { value: '3d', label: '3D'}
      ]}/>
    </Group>
  </SettingsWidget>
}