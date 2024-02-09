import type { MetaFunction } from '@remix-run/node'
import type { JSX } from 'react'
import { NavLink } from '~/components/nav-link.tsx'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index(): JSX.Element {
	return (
		<div className="h-lvh">
			<header className="flex w-full shrink-0 items-center justify-between border-b border-b-stone-950 pb-4 pt-4">
				<nav>
					<ul className="flex flex-row">
						<li>
							<NavLink to="/">ABOUT ME</NavLink>
						</li>
						<li>
							<NavLink to="/blog">BLOG</NavLink>
						</li>
						<li>
							<NavLink
								aria-disabled
								to="/reading-journal"
							>
								READING JOURNAL
							</NavLink>
						</li>
						<li>
							<NavLink to="/resume">RÉSUMÉ</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}
