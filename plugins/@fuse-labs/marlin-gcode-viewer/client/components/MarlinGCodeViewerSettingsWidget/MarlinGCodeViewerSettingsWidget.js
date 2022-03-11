import { Label, Group, SettingsWidget, SelectRaw } from "@fuse-labs/core-ui";

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