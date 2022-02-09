import * as icons from "@radix-ui/react-icons";
import React from "react";
import ScrollArea from "../../plugins/@fuse-labs/core-ui/components/shared/ScrollArea/ScrollArea";
import Tooltip from "../../plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip";
import DeviceProvider from "../DeviceProvider/DeviceProvider";
import MainLayout from "../layouts/MainLayout";
import Menu from "../react-daisyui/Menu/Menu";
import MenuItem from "../react-daisyui/Menu/MenuItem";
import DeviceConnectionStatus from "components/DeviceConnectionStatus/DeviceConnectionStatus";

export default function DevicePage({
  device,
  ...props
}) {

  if (!device) {
    throw new Error('DevicePage requires a device')
  }

  return <MainLayout>
    <DeviceProvider device={device}>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row space-x-2 items-center text-gray-50 font-medium text-sm mx-1.5 px-1.5 py-2 border-b border-gray-700">
          <span>
            {device.name}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-xxs text-gray-500">
            {device.brand} {device.model}
          </span>
          <div className="w-px h-full bg-gray-600" />
          <div className="!mr-auto text-xxs font-bold text-gray-400">
            Status or useful info on real time situation of the device
          </div>
          <div className="w-px h-full bg-gray-600" />
          <div>
            <DeviceConnectionStatus />
          </div>
        </div>
        <div className="flex-1 flex flex-row overflow-hidden">

          <div className="flex-none dark:bg-gray-900 dark:text-gray-200 rounded-lg m-2 mr-0 w-20 flex flex-col items-center justify-center">
            <Menu className="space-y-10">
              <Tooltip content={'Dashboard'} side="right" sideOffset={10}>
                <MenuItem icon={icons.DashboardIcon} href={`/workspace/devices/${device.id}/`} />
              </Tooltip>

              {device.plugins?.map(plugin => {
                  // Check if plugin has additional pages to allow for a link
                  if (!plugin.fuse.hasPages) return
                  let icon = icons[plugin.fuse.icon] || icons.QuestionMarkIcon
                  let href = `/workspace/devices/${device.id}/`+plugin.fuse.url
                  return <Tooltip key={plugin.name}
                    content={plugin.fuse.tooltip || plugin.fuse.title || plugin.name}
                    side="right" sideOffset={10}>
                    <MenuItem icon={icon} href={href} />
                  </Tooltip>
                })}
            </Menu>
          </div>
              
          <ScrollArea className="flex-1">
            <div className="p-3 flex flex-col space-y-3">
              {props.children}
            </div>
          </ScrollArea>

        </div>
      </div>
    </DeviceProvider>
  </MainLayout>
}