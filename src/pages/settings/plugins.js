import { SettingPage, DevicePluginsSettingsWidget, PluginsList } from '@fuse-labs/core-ui'
import { useAppContext } from "@fuse-labs/core-client";

export default function PluginsSettingsPage() {

  const { plugins } = useAppContext()

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <PluginsList plugins={plugins} />
    </SettingPage>
  )
}