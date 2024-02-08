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
			className={({ isActive }) => {
				const base = 'p-1'
				const disabled = 'aria-[disabled]:cursor-not-allowed aria-[disabled]:line-through'
				const extended = `${base} + ${disabled}` as const
				return isActive ? (`${extended} border-b-2 border-stone-950` as const) : extended
			}}
		>
			{children}
		</NavLink>
	)
}

export default function Index(): JSX.Element {
	return (
		<div className="h-lvh">
			<header className="flex w-full shrink-0 items-center justify-between border-b border-b-stone-950 pb-4 pt-4">
				<nav>
					<ul className="flex flex-row">
						<li>
							<Link to="/">ABOUT ME</Link>
						</li>
						<li>
							<Link to="/blog">BLOG</Link>
						</li>
						<li>
							<Link
								aria-disabled
								to="/reading-journal"
							>
								READING JOURNAL
							</Link>
						</li>
						<li>
							<Link to="/resume">RÉSUMÉ</Link>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}
