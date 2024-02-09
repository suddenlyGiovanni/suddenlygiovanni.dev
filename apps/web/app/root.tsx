import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import type { JSX } from 'react'

import './styles/tailwind.css'

export default function App(): JSX.Element {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					content="width=device-width, initial-scale=1"
					name="viewport"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
