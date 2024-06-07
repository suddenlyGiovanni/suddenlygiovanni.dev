import * as Schema from '@effect/schema/Schema'
import { invariantResponse } from '@epic-web/invariant'
import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration, json, useLoaderData } from '@remix-run/react'
import { Types, makeOpenGraphWebsite } from '@suddenlygiovanni/open-graph-protocol'
import * as Either from 'effect/Either'
import type { ReactElement, ReactNode } from 'react'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import hero2800wAssetUrl from '~/assets/hero/giovanni_ravalico-profile_color_e4cily_c_scale,w_2800.webp'
import { config } from '~/config.ts'
import { getHints } from '~/utils/client-hints.tsx'
import { getEnv } from '~/utils/env.server.ts'
import { getDomainUrl } from '~/utils/misc.ts'
import { getTheme, setTheme } from '~/utils/theme.server.ts'
import { ThemeFormSchema, useTheme } from '~/utils/theme.tsx'
import faviconAssertUrl from './assets/suddenly_giovanni-icon-white.svg'
import { Footer } from './footer.tsx'
import { Header } from './header.tsx'
import { Main } from './main.tsx'

import fontsStyleSheetUrl from './styles/fonts.css?url'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: faviconAssertUrl,
		},
		{ rel: 'stylesheet', href: fontsStyleSheetUrl, type: 'text/css' },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl, type: 'text/css' },
	]
}

export function meta({ location }: Parameters<MetaFunction>[number]) {
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

export function loader({ request }: LoaderFunctionArgs) {
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

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const payload = Object.fromEntries(formData)
	const parse = Schema.decodeUnknownEither(ThemeFormSchema, { errors: 'all' })
	const result = parse(payload)
	invariantResponse(Either.isRight(result), 'Invalid theme received', { status: 400 })
	const { theme } = result.right
	const responseInit = { headers: { 'set-cookie': setTheme(theme) } }
	return json(
		{
			result: {
				status: 'success',
				initialValue: payload,
				fields: Object.keys(payload),
			},
		},
		responseInit,
	)
}

function Document({
	children,
	env,
	theme,
}: {
	children: ReactNode
	// nonce: string
	theme?: 'light' | 'dark' | null // TODO: address this prop
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	env?: typeof ENV
}): ReactElement {
	return (
		<html className={clsx(theme, 'min-h-screen')} data-theme={clsx(theme)} lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
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

export default function App(): ReactElement {
	const data = useLoaderData<typeof loader>()
	const theme = useTheme()
	return (
		<Document env={data.ENV} theme={theme}>
			<Header theme={data.requestInfo.userPrefs.theme} />
			<Main />
			<Footer />
		</Document>
	)
}
