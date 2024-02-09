import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { MetaFunction, LinksFunction } from '@remix-run/node'
import { type ReactNode, type JSX } from 'react'
import { NavLink, SuddenlyGiovanni } from '~/components'
import faviconAssertUrl from '~/assets/suddenly_giovanni-icon-white.svg'
import './styles/tailwind.css'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: faviconAssertUrl,
		},
	]
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'suddenlyGiovanni' },
		{
			name: 'description',
			content: "@suddenlyGiovanni's personal website",
		},
	]
}

function Document({ children }: { children: ReactNode }): JSX.Element {
	return (
		<html
			className="h-full overflow-x-hidden"
			lang="en"
		>
			<head>
				<meta charSet="utf-8" />
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<Meta />
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
				<nav className="container mx-auto flex justify-between">
					<SuddenlyGiovanni
						ariaLabel="Navigate to blog page"
						to="/blog"
					/>
					<ul className="flex flex-row items-center">
						<li>
							<NavLink
								prefetch="intent"
								to="/"
							>
								ABOUT ME
							</NavLink>
						</li>
						<li>
							<NavLink
								prefetch="intent"
								to="/blog"
							>
								BLOG
							</NavLink>
						</li>
						<li>
							<NavLink
								aria-disabled
								prefetch="intent"
								to="/reading-journal"
							>
								READING JOURNAL
							</NavLink>
						</li>
						<li>
							<NavLink
								prefetch="intent"
								to="/resume"
							>
								RÉSUMÉ
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<div className="container mx-auto">
				<Outlet />
			</div>
		</Document>
	)
}
