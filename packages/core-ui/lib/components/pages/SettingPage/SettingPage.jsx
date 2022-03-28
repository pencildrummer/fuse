import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ScrollArea from "../../shared/ScrollArea/ScrollArea";
import MainLayout from "../../layouts/MainLayout/MainLayout";

function MenuItem({
  href,
  ...props
}) {

  const router = useRouter()
  const active = useMemo(_ => router.pathname.startsWith(href), [href, router.pathname])

  return <li className={classNames(
    'rounded-md text-sm font-medium',
    'transition-colors duration-150',
    {
      'hover:bg-gray-800 hover:bg-opacity-40': !active,
      'bg-blue-600': active
    }
  )}>
    {href
    ? (
      <Link href={href} passHref>
        <a className="block px-2 py-1 w-full h-full">
          {props.children}
        </a>
      </Link>
    ) : props.children}
  </li>
}

export default function SettingPage(props) {
  return <MainLayout>
    <div className="flex-1 h-full flex flex-row">

      <div className="flex-none py-2 pl-2">
        <div className={classNames(
          'dark:bg-gray-900 dark:text-gray-200',
          'w-44',
          'rounded-lg',
          'flex flex-col',
          'py-2'
        )}>
          <ul className="px-2 flex flex-col space-y-1">
            <MenuItem href="/settings/general">
              General
            </MenuItem>
            <MenuItem href="/settings/devices">
              Devices
            </MenuItem>
            <MenuItem href="/settings/plugins">
              Plugins
            </MenuItem>
          </ul>
        </div>
        
        <div className="text-xs font-bold text-center py-1 text-gray-600">
          v. 0.1
        </div>
      </div>

      <ScrollArea className="flex-1 max-w-screen-lg">
        <div className="p-2 flex flex-col space-y-3">
          {props.children}
        </div>
      </ScrollArea>

    </div>
  </MainLayout>
}