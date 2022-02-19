import SettingPage from "../../components/page-layouts/SettingPage";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";
import useSWRImmutable from 'swr/immutable'
import fetcher from "../../lib/client/fetcher";
import PluginsList from "../../plugins/@fuse-labs/core/components/PluginsList/PluginsList";

export default function PluginsSettingsPage() {

  const { data: plugins, error} = useSWRImmutable('/api/plugins/list', fetcher)

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <PluginsList plugins={plugins} />
    </SettingPage>
  )
}