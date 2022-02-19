import Link from 'next/link'
import * as icons from '@radix-ui/react-icons'
import * as Toolbar from '@radix-ui/react-toolbar'
import TabItem from './TabItem'
import { useAppContext } from 'components/AppProvider/AppProvider'

export default function Navbar() {

	const { plugins } = useAppContext()

	return (
		<Toolbar.Root className="relative flex flex-row items-center h-11 dark:bg-gray-900 dark:text-gray-200">
			<div className="flex-none w-20 flex items-center justify-center">
				<span className="font-bold">Fuse</span>
			</div>

			<div className='h-full flex-1 flex flex-row px-3 items-end'>
				<ul className="flex-1 flex flex-row items-end">
					<TabItem href="/workspace">
						<icons.HomeIcon />
						<span className='ml-2'>Workspace</span>
					</TabItem>
					{plugins?.map(plugin => {
						if (!plugin.fuse.hasTabs) return

						let Icon = icons[plugin.fuse.icon]
						return (
							<TabItem href={`/${plugin.fuse.url || plugin.name}`} key={`tab-${plugin.name}`}>
								{Icon && <Icon className="mr-2"/>}
								<span>{plugin.fuse.title}</span>
							</TabItem>
						)
					})}
				</ul>
				
				<ul className='flex flex-row items-end'>
					<TabItem href="/marketplace">
						<icons.CubeIcon />
					</TabItem>

					<TabItem href="/settings">
						<icons.GearIcon />
					</TabItem>
				</ul>
			</div>
		</Toolbar.Root>
	)
}