import type { ReactElement, ReactNode } from 'react'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'

import { ClientHintCheck } from '../utils/client-hints.tsx'
import type { Env } from '../utils/env.server.ts'

export function Document({
	children,
	env,
	theme,
	nonce,
}: {
	nonce?: string
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
