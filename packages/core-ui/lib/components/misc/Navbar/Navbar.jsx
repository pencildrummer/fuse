import * as icons from '@radix-ui/react-icons'
import * as Toolbar from '@radix-ui/react-toolbar'
import { useAppContext } from '@fuse-labs/core-client'
import TabItem from './TabItem'

export default function Navbar() {

	const { plugins } = useAppContext()

	return (
		<Toolbar.Root className="relative flex flex-row items-center h-11 dark:bg-gray-900 dark:text-gray-200">

			<div className='w-[74px]'>
				{/* MacOS traffic light space */}
			</div>

			{/* <div className="flex-none w-20 flex items-center justify-center">
				<span className="font-bold">Fuse</span>
			</div> */}

			<div className='h-full flex-1 flex flex-row px-3 items-end'>
				<ul className="flex-1 flex flex-row items-end">
					<TabItem href="/workspace">
						<icons.HomeIcon />
						<span className='ml-2'>Workspace</span>
					</TabItem>
					{plugins?.map(plugin => {

						let pluginComponents = plugin.components()

						if (pluginComponents.tab) {
							let Icon = icons[plugin.icon]
							return (
								<TabItem href={`/${plugin.url}`} key={`tab-${plugin.name}`}>
									{Icon && <Icon className="mr-2"/>}
									<span>{plugin.displayTitle}</span>
								</TabItem>
							)
						}
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