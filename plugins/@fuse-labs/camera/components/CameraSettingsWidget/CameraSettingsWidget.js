import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import Input from "../../../core-ui/components/shared/Input/Input";
import Label from "../../../core-ui/components/shared/Label/Label";
import Select from "../../../core-ui/components/shared/Select/Select";

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
        <Select id="device" options={devices}/>
      </Group>
      <Group className="justify-between">
        <Label htmlFor="snapshot-directory">
          Snapshot storage directory
        </Label>
        <Input id="snapshot-directory" />
      </Group>
    </SettingsWidget>
  )
}