import type { ReactElement, ReactNode } from 'react'
import { Outlet, useLoaderData, useRouteLoaderData } from 'react-router'

import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'

import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import faviconAssertUrl from '~/assets/suddenly_giovanni-icon-white.svg'
import { config } from '~/config.ts'
import { Document, Footer, GeneralErrorBoundary, Header, Main } from '~/shell/index.tsx'
import fontStyleSheetUrl from '~/styles/fonts.css?url'
import tailwindStyleSheetUrl from '~/styles/tailwind.css?url'
import { getHints } from '~/utils/client-hints.tsx'
import { getEnv } from '~/utils/env.server.ts'
import { getDomainUrl } from '~/utils/misc.ts'
import { getTheme } from '~/utils/theme.server.ts'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/root.ts'
import { useOptionalTheme, useTheme } from './routes/resources/theme-switch.tsx'

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

export function Layout({ children }: { children: ReactNode }): ReactElement {
	// if there was an error running the loader, data could be missing
	const data = useRouteLoaderData<typeof loader>('root')

	const theme = useOptionalTheme()
	return (
		<Document
			nonce={undefined}
			theme={theme}
			env={data?.ENV}
		>
			{children}
		</Document>
	)
}

export default function App(_: Route.ComponentProps): ReactElement {
	const { requestInfo } = useLoaderData<typeof loader>()
	const theme = useTheme()

	return (
		<>
			<Header theme={requestInfo.userPrefs.theme} />
			<Main>
				<Outlet />
			</Main>
			<Footer />
		</>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
