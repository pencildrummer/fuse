import Link from 'next/link'
import { Button } from '../../plugins/@fuse-labs/core-ui'
import { CubeIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons'
import * as Toolbar from '@radix-ui/react-toolbar'

export default function Navbar() {
	return (
		<Toolbar.Root className="relative flex flex-row items-center h-14 dark:bg-gray-900 dark:text-gray-200">
			<div className="flex-none w-20 flex items-center justify-center">
				<span className="font-bold">Fuse</span>
			</div>

			<div className='flex-1 flex flex-row px-3'>
				<div className="flex-1 flex flex-row space-x-3 items-center">
					<Toolbar.Link asChild>
						<Link href="/" passHref>
							<Button rounded>
								<HomeIcon />
								<span className='ml-2'>Workspace</span>
							</Button>
						</Link>
					</Toolbar.Link>

					<Toolbar.Link asChild>
						<Link href="/resources" passHref>
							<Button rounded>
								<CubeIcon />
								<span className='ml-2'>File manager</span>
							</Button>
						</Link>
					</Toolbar.Link>
				</div>

				<Toolbar.Separator />

				<div>
					<Toolbar.Link asChild>
						<Link href="/settings" passHref>
							<Button squared>
								<GearIcon />
							</Button>
						</Link>
					</Toolbar.Link>
				</div>
			</div>
		</Toolbar.Root>
	)
}