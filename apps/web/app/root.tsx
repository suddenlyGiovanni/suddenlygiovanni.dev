import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import type { JSX, ReactNode } from 'react'
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
				className={cn('bg-background', 'font-sans', 'text-foreground', 'antialiased')}
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

export default function AppWithProviders() {
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
