import SettingPage from "../../components/pages/SettingPage";
import { Group, Label, Switch, Widget } from "../../plugins/@fuse-labs/core-ui";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";

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
    </SettingPage>
  )
}