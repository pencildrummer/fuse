import { SettingsWidget, Group, InputRaw, Label, SelectRaw } from "@fuse-labs/core-ui";

export default function CameraSettingsWidget() {

  const devices = [
    {
      label: 'Camera 1',
      value: 'camera_1'
    },
    {
      label: 'Camera 2',
      value: 'camera_2'
    }
  ]

  return (
    <SettingsWidget>
      <Group className="justify-between">
        <Label htmlFor="device">
          Camera device
        </Label>
        <SelectRaw id="device" options={devices}/>
      </Group>
      <Group className="justify-between">
        <Label htmlFor="snapshot-directory">
          Snapshot storage directory
        </Label>
        <InputRaw id="snapshot-directory" />
      </Group>
    </SettingsWidget>
  )
}