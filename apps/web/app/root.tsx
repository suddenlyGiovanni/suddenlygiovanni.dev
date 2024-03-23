import type { SubmissionResult } from '@conform-to/react'
import * as Schema from '@effect/schema/Schema'
import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/node'
import { Links, Meta, Scripts, ScrollRestoration, json, useLoaderData } from '@remix-run/react'
import * as Either from 'effect/Either'
import type { ReactElement, ReactNode } from 'react'

import { Layout } from '@suddenly-giovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'

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

export const meta: MetaFunction = () => {
	return [
		{ title: 'suddenlyGiovanni' },
		{
			name: 'description',
			content: "@suddenlyGiovanni's personal website",
		},
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
		ENV: getEnv(),
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const payload = Object.fromEntries(formData)
	const parse = Schema.decodeUnknownEither(ThemeFormSchema, { errors: 'all' })
	const result = parse(payload)
	if (Either.isLeft(result)) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal -- This is how remix likes it
		throw new Response('Invalid theme received', { status: 400 })
	}
	const { theme } = result.right
	const responseInit = { headers: { 'set-cookie': setTheme(theme) } }
	return json(
		{
			result: {
				status: 'success',
				initialValue: payload,
				fields: Object.keys(payload),
			} satisfies SubmissionResult,
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
	env?: Record<string, string>
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
