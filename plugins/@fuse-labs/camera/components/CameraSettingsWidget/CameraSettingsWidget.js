import SettingsWidget from "@fuse-labs/core-ui/components/misc/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import Input, { InputRaw } from "../../../core-ui/components/shared/Input/Input";
import Label from "../../../core-ui/components/shared/Label/Label";
import { SelectRaw } from "../../../core-ui/components/shared/Select/Select";

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