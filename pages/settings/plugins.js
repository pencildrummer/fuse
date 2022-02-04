import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import SettingPage from "../../components/page-layouts/SettingPage";
import { Button, Switch, Widget } from "../../plugins/@fuse-labs/core-ui";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";
import useSWRImmutable from 'swr/immutable'
import fetcher, { fetcherPOST } from "../../lib/client/fetcher";

export default function PluginsSettingsPage() {

  const { data: plugins, error, loading} = useSWRImmutable('/api/plugins/list', fetcher)
  
  function setPluginActive(name, activate) {
    console.log('Requesting activation:', name, activate)
    fetcherPOST('/api/plugins/activate', { name: name, activate: activate })
      .then(res => console.log('RES'))
      .catch(e => console.error(e))
  }

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <Widget>
        <ul className="flex flex-col divide-y divide-gray-700">
          {plugins?.map((plugin, i) => (
            <li key={`plugin-${i}`} className="flex flex-row items-stretch space-x-3 py-2">

              <div className="w-10 h-10 bg-gray-700 bg-opacity-25 rounded-full overflow-hidden">

              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-row space-x-2 items-center">
                  <div className="text-gray-50">
                    <span className="font-bold">{plugin.fuse?.title || plugin.name}</span>
                    {plugin.author && (
                      <span className="text-xs text-gray-600 ml-1">
                        <span>by </span>
                        <span className="text-xs text-gray-500 font-medium">{plugin.author}</span>
                      </span>
                    )}
                  </div>

                  {plugin.fuse?.system && <div><span className="text-xxs font-semibold bg-blue-600 rounded-full px-2 py-0.5">CORE</span></div>}
                </div>
                <div className="flex flex-row items-center space-x-3">
                  <div className="text-xxs font-mono">
                    <span className="rounded-[3px] bg-gray-800 px-1 py-0.5">{plugin.name}@{plugin.version}</span>
                  </div>
                </div>
              </div>

              {plugin.fuse?.settings && <div className="w-20 flex items-center justify-center">
                <Link href={`/plugins/${plugin.name}/settings`}>
                  <Button rounded squared size="sm">
                    <GearIcon />
                  </Button>
                </Link>
              </div>}

              <div className="flex items-center">
                <Switch defaultChecked={plugin.active}
                  disabled={plugin.fuse?.system} 
                  onCheckedChange={v => setPluginActive(plugin.name, v)} />
              </div>
            </li>
          )
          )}
        </ul>
      </Widget>
    </SettingPage>
  )
}