import { invariantResponse } from '@epic-web/invariant'
import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'
import { Either, Schema } from 'effect'
import type { ReactElement, ReactNode } from 'react'
import { Links, Meta, Scripts, ScrollRestoration, data, useLoaderData } from 'react-router'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { getHints } from '~/utils/client-hints.tsx'
import { type Env, getEnv } from '~/utils/env.server.ts'
import { getDomainUrl } from '~/utils/misc.ts'
import { getTheme, setTheme } from '~/utils/theme.server.ts'
import { ThemeFormSchema, useTheme } from '~/utils/theme.tsx'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Footer } from './footer.tsx'
import { Header } from './header.tsx'
import { Main } from './main.tsx'

import tailwindStyleSheetUrl from './styles/tailwind.css?url'

// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import type { Route } from './+types/root.ts'

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

function Document({
	children,
	env,
	theme,
}: {
	children: ReactNode
	theme?: 'light' | 'dark' | null
	env?: Env
}): ReactElement {
	return (
		<html
			className="min-h-screen"
			data-theme={theme}
			lang="en"
		>
			<head>
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
			<Layout.Body
				className={clsx('min-h-full bg-background font-sans text-foreground antialiased')}
			>
				{children}
				<ScrollRestoration />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: we need to set the ENV variable
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env, null, 2)};`,
					}}
				/>
				<Scripts />
			</Layout.Body>
		</html>
	)
}

export default function App(_: Route.ComponentProps): ReactElement {
	const { ENV, requestInfo } = useLoaderData<typeof loader>()
	const theme = useTheme()
	return (
		<Document
			env={ENV}
			theme={theme}
		>
			<Header theme={requestInfo.userPrefs.theme} />
			<Main />
			<Footer />
		</Document>
	)
}
