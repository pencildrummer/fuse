import Link from 'next/link'
import { Button } from '../../plugins/@fuse-labs/core-ui'
import { CubeIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons'
import * as Toolbar from '@radix-ui/react-toolbar'
import TabItem from './TabItem'

export default function Navbar() {
	return (
		<Toolbar.Root className="relative flex flex-row items-center h-14 dark:bg-gray-900 dark:text-gray-200">
			<div className="flex-none w-20 flex items-center justify-center">
				<span className="font-bold">Fuse</span>
			</div>

			<div className='h-full flex-1 flex flex-row px-3 items-end'>
				<ul className="flex-1 flex flex-row items-end">
					<TabItem href="/workspace">
						<HomeIcon />
						<span className='ml-2'>Workspace</span>
					</TabItem>
					<TabItem href="/file-manager">
						<CubeIcon />
						<span className='ml-2'>File manager</span>
					</TabItem>
				</ul>

				<Toolbar.Separator />

				<div>
					<TabItem href="/settings">
						<GearIcon />
					</TabItem>
				</div>
			</div>
		</Toolbar.Root>
	)
}