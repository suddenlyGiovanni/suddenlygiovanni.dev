import { makeOpenGraphWebsite, Types } from '@repo/open-graph-protocol'
import { Layout as _Layout } from '@repo/ui/components/layout/layout.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import type { ReactElement, ReactNode } from 'react'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteLoaderData,
} from 'react-router'

import hero2800wAssetUrl from '#root/content/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import faviconAssertUrl from '#root/content/assets/suddenly_giovanni-icon-white.svg'
import { config } from '#root/src/config.ts'
import { useOptionalTheme, useTheme } from '#root/src/routes/resources/theme-switch.tsx'
import { Footer, GeneralErrorBoundary, Header } from '#root/src/shell/index.tsx'
import tailwindStyleSheetUrl from '#root/src/styles/tailwind.css?url'
import { ClientHintCheck, getHints } from '#root/src/utils/client-hints.tsx'
import { getEnv } from '#root/src/utils/env.server.ts'
import { getDomainUrl } from '#root/src/utils/misc.ts'
import { getTheme } from '#root/src/utils/theme.server.ts'

import type { Route } from './+types/root.ts'

const { Body, Main } = _Layout

export const links: Route.LinksFunction = () => {
	return [
		{
			href: faviconAssertUrl,
			rel: 'icon',
			type: 'image/svg+xml',
		},
		{ href: 'https://fonts.googleapis.com', rel: 'preconnect' },
		{ crossOrigin: 'use-credentials', href: 'https://fonts.gstatic.com', rel: 'preconnect' },
		{
			href: 'https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght,BNCE,INFM,SPAC@0,300..800,-100..100,0..100,0..100;1,300..800,-100..100,0..100,0..100&display=swap',
			rel: 'stylesheet',
		},
		{ href: tailwindStyleSheetUrl, rel: 'stylesheet', type: 'text/css' },
	]
}

export function meta({ location }: Route.MetaArgs) {
	const description = "@suddenlyGiovanni's personal website"
	const title = config.siteName
	return [
		{ title },
		{
			content: description,
			name: 'description',
		},
		makeOpenGraphWebsite({
			ogDescription: Types.String(description),
			ogImage: Types.URL(config.siteUrl + hero2800wAssetUrl),
			ogLocale: Types.String('en_US'),
			ogSiteName: Types.String(config.siteName),
			ogTitle: Types.String(title),
			ogType: Types.Enum('website'),
			ogUrl: Types.URL(config.siteUrl + location.pathname),
		}),
	]
}

export function loader({ request }: Route.LoaderArgs) {
	return {
		ENV: getEnv(),

		requestInfo: {
			hints: getHints(request),
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
			userPrefs: { theme: getTheme(request) },
		},
	}
}

export function Layout(props: { children: ReactNode }): ReactElement {
	// if there was an error running the loader, data could be missing
	const data = useRouteLoaderData<typeof loader>('root')

	const theme = useOptionalTheme()
	return (
		<html
			className="min-h-screen"
			data-theme={theme}
			lang="en"
		>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta
					content="text/html;charset=utf-8"
					httpEquiv="Content-Type"
				/>
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<Meta />
				<Links />
			</head>
			<Body className={clsx('min-h-full bg-background font-sans text-foreground antialiased')}>
				{props.children}

				{/**
				 * Manages scroll position for src-side transitions
				 * If you use a nonce-based content security policy for scripts, you must provide the
				 *  `nonce` prop. Otherwise, omit the nonce prop as shown here.
				 */}
				<ScrollRestoration />

				{/**
				 * Script tags go here
				 * If you use a nonce-based content security policy for scripts, you must provide the
				 *  `nonce` prop.
				 *  Otherwise, omit the nonce prop as shown here.
				 */}
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: we need to set the ENV variable
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data?.ENV, null, 2)};`,
					}}
				/>
				<Scripts />
			</Body>
		</html>
	)
}

export default function App(_: Route.ComponentProps): ReactElement {
	const { requestInfo } = useLoaderData<typeof loader>()
	const theme = useTheme()

	return (
		<>
			<Header theme={requestInfo.userPrefs.theme} />
			<Main className="mx-auto my-8 h-full w-full max-w-4xl px-8">
				<Outlet />
			</Main>
			<Footer />
		</>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
