import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react'
import type { JSX, ReactNode } from 'react'
import { Layout } from '@suddenly-giovanni/ui'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Footer } from './footer.tsx'
import { Main } from './main.tsx'
import { Header } from './header.tsx'

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

export default function App(): JSX.Element {
	return (
		<Document>
			<Header />
			<Main />
			<Footer />
		</Document>
	)
}
