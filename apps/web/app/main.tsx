import { Outlet } from '@remix-run/react'
import { Layout } from '@suddenly-giovanni/ui/components/layout/layout.tsx'
import type { JSX } from 'react'

export function Main(): JSX.Element {
	return (
		<Layout.Main className="mx-auto my-8 h-full w-full max-w-4xl px-8">
			<Outlet />
		</Layout.Main>
	)
}
