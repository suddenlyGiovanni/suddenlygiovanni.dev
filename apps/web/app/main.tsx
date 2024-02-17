import { Outlet } from '@remix-run/react'
import { Layout } from '@suddenly-giovanni/ui'
import type { JSX } from 'react'

export function Main(): JSX.Element {
	return (
		<Layout.Main className="container mx-auto h-full">
			<Outlet />
		</Layout.Main>
	)
}
