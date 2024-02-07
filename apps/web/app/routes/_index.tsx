import { NavLink, type NavLinkProps } from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import type { JSX } from 'react'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

function Link({ children, ...props }: Omit<NavLinkProps, 'className'>): JSX.Element {
	return (
		<NavLink
			{...props}
			className="p-1 aria-[disabled]:cursor-not-allowed aria-[current-page]:border-b-2 aria-[disabled]:line-through"
		>
			{children}
		</NavLink>
	)
}

export default function Index() {
	return (
		<div className="flex ">
			<header>
				<nav className="flex align-middle">
					<ul>
						<li>
							<Link to={'#'}>Home</Link>
						</li>
						<li>
							<Link
								to={'/about'}
								aria-disabled
							>
								About
							</Link>
						</li>
						<li>
							<Link to={'/contact'}>Contact</Link>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}
