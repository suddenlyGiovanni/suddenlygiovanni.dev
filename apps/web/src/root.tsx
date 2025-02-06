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

import { Layout as _Layout } from '@suddenly-giovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'

import hero2800wAssetUrl from 'assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import faviconAssertUrl from 'assets/suddenly_giovanni-icon-white.svg'
import { config } from '#config.ts'
import { useOptionalTheme, useTheme } from '#routes/resources/theme-switch.tsx'
import { Footer, GeneralErrorBoundary, Header } from '#shell/index.tsx'
import fontStyleSheetUrl from '#styles/fonts.css?url'
import tailwindStyleSheetUrl from '#styles/tailwind.css?url'
import { getHints } from '#utils/client-hints.tsx'
import { ClientHintCheck } from '#utils/client-hints.tsx'
import { getEnv } from '#utils/env.server.ts'
import { getDomainUrl } from '#utils/misc.ts'
import { getTheme } from '#utils/theme.server.ts'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/root.ts'

const { Body, Main } = _Layout

export const links: Route.LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: faviconAssertUrl,
		},
		{ rel: 'preload', href: fontStyleSheetUrl, as: 'style' },
		{ rel: 'stylesheet', href: fontStyleSheetUrl },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl, type: 'text/css' },
	]
}

// biome-ignore lint/nursery/useExplicitType: <explanation>
export function meta({ location }: Route.MetaArgs) {
	const description = "@suddenlyGiovanni's personal website"
	const title = config.siteName
	return [
		{ title },
		{
			name: 'description',
			content: description,
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

// biome-ignore lint/nursery/useExplicitType: <explanation>
export function loader({ request }: Route.LoaderArgs) {
	return {
		requestInfo: {
			hints: getHints(request),
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
			userPrefs: { theme: getTheme(request) },
		},

		ENV: getEnv(),
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
					httpEquiv="Content-Type"
					content="text/html;charset=utf-8"
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
				 * Manages scroll position for client-side transitions
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
