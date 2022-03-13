import { GearIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { coreSocket } from "@fuse-labs/core-client"
import { Button, SwitchRaw, Badge } from "@fuse-labs/core-ui"

export default function PluginListItem({
  plugin,
  ...props
}) {

  function setPluginActive(name, activate) {
    if (activate) {
      coreSocket.emit('plugins:activate', name, res => {
        console.log('Activated:', res)
      })
    } else {
      coreSocket.emit('plugins:deactivate', name, res => {
        console.log('Deactivated:', res)
      })
    }
  }

  return (
    <li className="flex flex-row items-stretch space-x-3 py-2">

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

          {plugin.system && <Badge size="sm" className="bg-blue-600">SYSTEM</Badge>}
          {plugin.fuse?.type == 'driver' && <Badge size="sm" className="bg-amber-600 text-amber-50">DRIVER</Badge>}
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div className="text-xxs font-mono">
            <span className="rounded-[3px] bg-gray-800 px-1 py-0.5">{plugin.name}@{plugin.version}</span>
          </div>
        </div>
      </div>

      {plugin.settings && <div className="w-20 flex items-center justify-center">
        <Link href={`/settings/plugins/${plugin.name}`} passHref>
          <Button rounded squared size="sm">
            <GearIcon />
          </Button>
        </Link>
      </div>}

      <div className="flex items-center">
        <SwitchRaw defaultChecked={plugin.active}
          disabled={plugin.system} 
          onCheckedChange={v => setPluginActive(plugin.name, v)} />
      </div>
    </li>
  )
}