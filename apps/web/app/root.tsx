import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { NavLink as UnstyledNavLink, type NavLinkProps } from '@remix-run/react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import {
	GitHubIconLink,
	Layout,
	LinkedInIconLink,
	SuddenlyGiovanni,
	TwitterIconLink,
	cn,
} from '@suddenly-giovanni/ui'
import type { JSX, ReactNode } from 'react'
import avatarAssetUrl from '~/assets/giovanni_ravalico-profile_bw.webp'
import faviconAssertUrl from '~/assets/suddenly_giovanni-icon-white.svg'
import hamburgerMenuAssertUrl from '~/assets/hamburger-menu.svg'

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
			<Layout.Body className="bg-background text-foreground">
				{children}
				<ScrollRestoration />
				<Scripts />
			</Layout.Body>
		</html>
	)
}

function NavLink({ children, ...props }: Omit<NavLinkProps, 'className'>): JSX.Element {
	return (
		<UnstyledNavLink
			{...props}
			className={({ isActive }) => {
				const base = 'p-1'
				const disabled = 'aria-[disabled]:cursor-not-allowed aria-[disabled]:line-through'
				const extended = `${base} + ${disabled}` as const
				return isActive ? (`${extended} border-b-2 border-stone-950` as const) : extended
			}}
		>
			{children}
		</UnstyledNavLink>
	)
}

function Header(): JSX.Element {
	return (
		<Layout.Header className="flex w-full justify-between gap-4 border-b border-b-stone-950 py-4">
			<SuddenlyGiovanni
				ariaLabel="Navigate to blog page"
				hrefUrl={avatarAssetUrl}
				to="/blog"
			/>
			<button
				aria-controls="primary-navigation"
				className={cn(
					'block md:hidden',
					'absolute right-4 top-8 z-40',
					'border-0 bg-transparent',
					`bg-[url(${hamburgerMenuAssertUrl})]`,
				)}
				type="button"
			>
				<span
					aria-expanded={false}
					className="sr-only"
				>
					Menu
				</span>
			</button>
			<nav aria-label="mobile navigation">
				<menu
					className={cn(
						'inset-y-0 left-[20%] right-0 z-auto px-8 py-12 md:h-full md:p-0',
						'fixed md:static',
						'flex justify-between gap-2',
						'flex-col items-center md:flex-row md:items-center',
						'bg-slate-700/20 backdrop-blur-xl md:bg-inherit md:backdrop-filter-none',
					)}
					id="primary-navigation"
				>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/"
						>
							ABOUT ME
						</NavLink>
					</li>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/blog"
						>
							BLOG
						</NavLink>
					</li>
					<li>
						<NavLink
							aria-disabled
							prefetch="intent"
							tabIndex={0}
							to="/reading-journal"
						>
							READING JOURNAL
						</NavLink>
					</li>
					<li>
						<NavLink
							prefetch="intent"
							tabIndex={0}
							to="/resume"
						>
							RÉSUMÉ
						</NavLink>
					</li>
				</menu>
			</nav>
		</Layout.Header>
	)
}

function Main(): JSX.Element {
	return (
		<Layout.Main className="container mx-auto h-full">
			<Outlet />
		</Layout.Main>
	)
}

const twitter = { url: '', handle: '', user: '' },
	linkedin = { url: '', handle: '', user: '' },
	github = { url: '', handle: '', user: '' }

function Footer(): JSX.Element {
	const copyrightYear = new Date().getFullYear().toString()
	return (
		<Layout.Footer className="w-full  border-t border-t-black">
			<div className="flex max-w-screen-md flex-wrap content-between pb-4 sm:pb-4">
				<span className="mb-0 mt-4 flex-auto">© {copyrightYear} Giovanni Ravalico</span>
				<address className="mt-4 flex min-w-32 items-center justify-between">
					<TwitterIconLink href={twitter.url + twitter.handle} />
					<GitHubIconLink href={github.url + github.user} />
					<LinkedInIconLink href={linkedin.url + linkedin.user} />
				</address>
			</div>
		</Layout.Footer>
	)
}

export default function App(): JSX.Element {
	return (
		<Document>
			<Header />
			<Main />
			<Footer />
		</Document>
	)
}
