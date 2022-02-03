import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import plugin from "tailwindcss/plugin";
import SettingPage from "../../components/pages/SettingPage";
import { Button, Switch, Widget } from "../../plugins/@fuse-labs/core-ui";
import DevicePluginsSettingsWidget from "../../plugins/@fuse-labs/core/components/DevicePluginsSettingsWidget/DevicePluginsSettingsWidget";

export default function PluginsSettingsPage() {

  const plugins = [
    {
      title: 'Marlin Core',
      name: 'marlin-core',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin CoreUI',
      name: 'marlin-coreui',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Camera',
      name: 'camera',
      system: false,
      version: '0.1',
      author: '@fuse-labs',
      active: true,
      config: true,
    },
    {
      title: 'Marlin Extruder',
      name: 'marlin-extruder',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin GCode Viewer',
      name: 'marlin-gcode-viewer',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin Move',
      name: 'marlin-move',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin Extra',
      name: 'marlin-misc',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin Temperature',
      name: 'marlin-temp',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    },
    {
      title: 'Marlin Terminal',
      name: 'marlin-terminal',
      system: true,
      version: '0.1',
      author: '@fuse-labs',
      active: true
    }
  ]

  return (
    <SettingPage>
      <DevicePluginsSettingsWidget />
      <Widget>
        <ul className="flex flex-col divide-y divide-gray-700">
          {plugins.map((plugin, i) => (
            <li key={`plugin-${i}`} className="flex flex-row items-stretch space-x-3 py-2">

              <div className="w-10 h-10 bg-gray-700 bg-opacity-25 rounded-full overflow-hidden">

              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-row space-x-2 items-center">
                  <div className="text-gray-50">
                    <span className="font-bold">{plugin.title}</span>
                    <span className="text-xs text-gray-600"> by </span>
                    <span className="text-xs text-gray-500 font-medium">{plugin.author}</span>
                  </div>

                  {plugin.system && <div><span className="text-xxs font-semibold bg-blue-600 rounded-full px-2 py-0.5">CORE</span></div>}
                </div>
                <div className="flex flex-row items-center space-x-3">
                  <div className="text-xxs font-mono">
                    <span className="rounded-[3px] bg-gray-800 px-1 py-0.5">{plugin.author}/{plugin.name}@{plugin.version}</span>
                  </div>
                </div>
              </div>

              {plugin.config && <div className="w-20 flex items-center justify-center">
                <Link href={`/plugins/${plugin.name}/settings`}>
                  <Button rounded squared size="sm">
                    <GearIcon />
                  </Button>
                </Link>
              </div>}

              <div className="flex items-center">
                <Switch defaultChecked={plugin.active} disabled={plugin.system} />
              </div>
            </li>
          )
          )}
        </ul>
      </Widget>
    </SettingPage>
  )
}