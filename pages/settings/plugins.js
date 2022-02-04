import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import SettingPage from "../../components/page-layouts/SettingPage";
import { Button, Switch, Widget } from "../../plugins/@fuse-labs/core-ui";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";
import useSWRImmutable from 'swr/immutable'
import fetcher, { fetcherPOST } from "../../lib/client/fetcher";
import PluginsList from "../../plugins/@fuse-labs/core/components/PluginsList/PluginsList";

export default function PluginsSettingsPage() {

  const { data: plugins, error, loading} = useSWRImmutable('/api/plugins/list', fetcher)

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <PluginsList plugins={plugins} />
    </SettingPage>
  )
}