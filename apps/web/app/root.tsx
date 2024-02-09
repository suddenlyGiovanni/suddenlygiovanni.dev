import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { type ReactNode, type JSX } from 'react'
import { NavLink } from '~/components/nav-link.tsx'

import './styles/tailwind.css'

function Document({ children }: { children: ReactNode }): JSX.Element {
	return (
		<html
			className="h-full overflow-x-hidden"
			lang="en"
		>
			<head>
				<Meta />
				<meta charSet="utf-8" />
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App(): JSX.Element {
	return (
		<Document>
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
			<Outlet />
		</Document>
	)
}
