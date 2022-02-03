import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import Label from "../../../core-ui/components/shared/Label/Label";
import Select from "../../../core-ui/components/shared/Select/Select";

export default function MarlinGCodeViewerSettingsWidget() {
  return <SettingsWidget>
    <Group className="justify-between">
      <Label htmlFor="mode">
        Display mode
      </Label>
      <Select id="mode" options={[
        { value: '2d', label: '2D' },
        { value: '3d', label: '3D'}
      ]}/>
    </Group>
  </SettingsWidget>
}