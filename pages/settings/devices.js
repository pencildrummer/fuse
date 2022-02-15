import DeviceProfileForm from "components/DeviceSettings/DeviceProfileForm/DeviceProfileForm";
import DeviceProfilesList from "components/DeviceSettings/DeviceProfilesList/DevicesProfilesList";
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

      <Widget title="Profiles">
        <div className="grid grid-cols-2 gap-2">
          <DeviceProfilesList className="h-[400px]"/>
          <div className="flex-1">
            <DeviceProfileForm className="h-full flex flex-col"/>
          </div>
        </div>
      </Widget>

      <SerialPortListWidget />
    </SettingPage>
  )
}