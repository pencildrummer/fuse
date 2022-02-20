import SettingPage from "../../components/page-layouts/SettingPage";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";
import PluginsList from "../../plugins/@fuse-labs/core/components/PluginsList/PluginsList";
import { useAppContext } from "components/AppProvider/AppProvider";

export default function PluginsSettingsPage() {

  const { plugins } = useAppContext()

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <PluginsList plugins={plugins} />
    </SettingPage>
  )
}