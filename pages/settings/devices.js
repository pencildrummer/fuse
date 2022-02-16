import DeviceProfilesWidget from "components/DeviceSettings/DeviceProfilesWidget/DeviceProfilesWidget";
import SerialPortListWidget from "components/SerialPortListWidget/SerialPortListWidget";
import SettingPage from "../../components/page-layouts/SettingPage";
import { Group, Label, Switch, Widget } from "../../plugins/@fuse-labs/core-ui";

export default function DevicesSettingsPage() {
  return (
    <SettingPage>
      <Widget>
        <Group>
          <Label>
            Automatic discover
          </Label>
          <Switch />
        </Group>
      </Widget>

      <DeviceProfilesWidget />

      <SerialPortListWidget />
    </SettingPage>
  )
}