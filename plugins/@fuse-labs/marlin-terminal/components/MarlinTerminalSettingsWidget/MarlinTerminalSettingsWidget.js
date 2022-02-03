import SettingsWidget from "../../../core-ui/components/SettingsWidget/SettingsWidget";
import Group from "../../../core-ui/components/shared/Group/Group";
import Input from "../../../core-ui/components/shared/Input/Input";
import Label from "../../../core-ui/components/shared/Label/Label";
import SerialPortSelect from '../../../../../components/DeviceSettings/DeviceConnectionWidget/components/SerialPortSelect/SerialPortSelect';

export default function MarlinTerminalSettingsWidget({
  ...props
}) {

  return <SettingsWidget>
    <div className="grid grid-cols-2 gap-4">
      <Group orientation="vertical">
        <Label htmlFor="serial-port">
          Serial port
        </Label>
        <SerialPortSelect id="serial-port" disabled/>
      </Group>
      <Group orientation="vertical">
        <Label htmlFor="baud-rate">
          Baud rate
        </Label>
        <Input id="baud-rate" value={56200} disabled/>
      </Group>
    </div>
  </SettingsWidget>
}