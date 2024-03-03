import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from 'remix-themes'
import { Layout, cn } from '@suddenly-giovanni/ui'
import { themeSessionResolver } from './sessions.server'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Footer } from './footer.tsx'
import { Main } from './main.tsx'
import { Header } from './header.tsx'

import './styles/tailwind.css'

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request)
	return { theme: getTheme() }
}

export const links: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: faviconAssertUrl,
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'use-credentials' },
		{
			href: 'https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght,BNCE,INFM,SPAC@0,300..800,-100..100,0..100,0..100;1,300..800,-100..100,0..100,0..100&display=swap',
			rel: 'stylesheet',
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

function Document({ children }: { children: ReactNode }): ReactElement {
	const data = useLoaderData<typeof loader>()
	const [theme] = useTheme()
	return (
		<html
			className={cn(theme, 'min-h-screen')}
			data-theme={cn(theme)}
			lang="en"
		>
			<head>
				<meta charSet="utf-8" />
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<Layout.Body
				className={cn(
					'min-h-full',
					'bg-background',
					'text-foreground',
					'font-sans',
					'antialiased',
				)}
			>
				{children}
				<ScrollRestoration />
				<Scripts />
			</Layout.Body>
		</html>
	)
}

function App(): JSX.Element {
	return (
		<Document>
			<Header />
			<Main />
			<Footer />
		</Document>
	)
}

export default function AppWithProviders(): ReactElement {
	const data = useLoaderData<typeof loader>()
	return (
		<ThemeProvider
			specifiedTheme={data.theme}
			themeAction="/action/set-theme"
		>
			<App />
		</ThemeProvider>
	)
}
