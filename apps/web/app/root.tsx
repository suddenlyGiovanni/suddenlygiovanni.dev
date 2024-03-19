import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { Layout } from '@suddenly-giovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import type { ReactElement, ReactNode } from 'react'
import { PreventFlashOnWrongTheme, type Theme, ThemeProvider, useTheme } from 'remix-themes'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Footer } from './footer.tsx'
import { Header } from './header.tsx'
import { Main } from './main.tsx'
import { themeSessionResolver } from './sessions.server'

import './styles/tailwind.css'

export async function loader({ request }: LoaderFunctionArgs): Promise<{
	theme: null | Theme
}> {
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

function Document({ children }: { children: ReactNode }): ReactElement {
	const data = useLoaderData<typeof loader>()
	const [theme] = useTheme()
	return (
		<html className={clsx(theme, 'min-h-screen')} data-theme={clsx(theme)} lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<Layout.Body
				className={clsx(
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

function App(): ReactElement {
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
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<App />
		</ThemeProvider>
	)
}
