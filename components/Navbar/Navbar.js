import Link from 'next/link'
import { CogIcon } from '@heroicons/react/solid'

export default function Navbar() {
	return (
		<div className="navbar bg-neutral px-5">
			<div className="flex-none">
				<span className="font-bold">Fuse</span>
			</div>
			<div className="flex-1">
				<Link href="/" passHref>
					<a className="btn btn-sm">
						Printers
					</a>
				</Link>
			</div>
			<div>
				<Link href="/settings" passHref>
					<a className="btn btn-sm btn-square btn-ghost">
						<CogIcon className="w-5 h-5"/>
					</a>
				</Link>
			</div>
		</div>
	)
}