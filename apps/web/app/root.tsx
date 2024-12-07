import { invariantResponse } from '@epic-web/invariant'
import { Either, Schema } from 'effect'
import type { ReactElement } from 'react'
import { data, useLoaderData } from 'react-router'

import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'

import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { getHints } from '~/utils/client-hints.tsx'
import { getEnv } from '~/utils/env.server.ts'
import { getDomainUrl } from '~/utils/misc.ts'
import { getTheme, setTheme } from '~/utils/theme.server.ts'
import { ThemeFormSchema, useTheme } from '~/utils/theme.tsx'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/root.ts'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Document, Footer, Header, Main } from './shell/index.tsx'

import tailwindStyleSheetUrl from './styles/tailwind.css?url'

export const links: Route.LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: faviconAssertUrl,
		},
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

		// biome-ignore lint/style/useNamingConvention: <explanation>
		ENV: getEnv(),
	}
}

// biome-ignore lint/nursery/useExplicitType: <explanation>
export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const payload = Object.fromEntries(formData)
	const parse = Schema.decodeUnknownEither(ThemeFormSchema, { errors: 'all' })
	const result = parse(payload)
	invariantResponse(Either.isRight(result), 'Invalid theme received', { status: 400 })

	return data(
		{
			result: {
				status: 'success',
				initialValue: payload,
				fields: Object.keys(payload),
			},
		},
		{
			headers: {
				'set-cookie': setTheme(result.right.theme),
			},
		},
	)
}

export default function App(_: Route.ComponentProps): ReactElement {
	const { ENV, requestInfo } = useLoaderData<typeof loader>()
	const theme = useTheme()
	return (
		<Document
			env={ENV}
			theme={theme}
			nonce={undefined}
		>
			<Header theme={requestInfo.userPrefs.theme} />
			<Main />
			<Footer />
		</Document>
	)
}
