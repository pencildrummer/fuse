import React from 'react'
import { useDeviceContext } from "components/DeviceProvider/DeviceProvider"
import * as icons from "@radix-ui/react-icons";
import Tooltip from "plugins/@fuse-labs/core-ui/components/shared/Tooltip/Tooltip";
import classNames from "classnames";
import Link from 'next/link'

export default function DevicePageSidebar() {

  const { device } = useDeviceContext()

  return (
    <div className="flex-none dark:bg-gray-900 dark:text-gray-200 rounded-lg m-2 mr-0 w-20 flex flex-col items-center justify-center">
      <SidebarMenu>
        <Tooltip content={'Dashboard'} side="right" sideOffset={10}>
          <SidebarMenuItem icon={icons.DashboardIcon} href={`/workspace/devices/${device.id}/`} />
        </Tooltip>

        {device.plugins?.map(plugin => {
            // Check if plugin has additional pages to allow for a link
            if (!plugin.fuse.hasPages) return
            let icon = icons[plugin.fuse.icon] || icons.QuestionMarkIcon
            let href = `/workspace/devices/${device.id}/`+plugin.fuse.url
            return <Tooltip key={plugin.name}
              content={plugin.fuse.tooltip || plugin.fuse.title || plugin.name}
              side="right" sideOffset={10}>
              <SidebarMenuItem icon={icon} href={href} />
            </Tooltip>
          })}
      </SidebarMenu>
    </div>
  )
}

function SidebarMenu(props) {
  return (
    <ul className="flex flex-col space-y-10 rounded-md">
      {props.children}
    </ul>
  )
}

const SidebarMenuItem =  React.forwardRef( ({
  icon: Icon,
  iconClassName,
  href,
  ...props
}, ref) => {

  const contents = (<>
    {Icon && <Icon className={classNames('w-5 h-5', iconClassName)} />}
    {props.children}
  </>)

  return <li ref={ref} className="flex items-center justify-center" {...props}>
    {href ? (
      <Link href={href}>
        <a className="dark:hover:bg-gray-700 hover:bg-opacity-10 p-3 rounded-md transition-colors duration-150">
          {contents}
        </a>    
      </Link>
    ) : contents}
  </li>
})