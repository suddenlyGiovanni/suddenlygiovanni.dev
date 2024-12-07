import type { JSX } from 'react'
import { Outlet } from 'react-router'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'

export function Main(): JSX.Element {
	return (
		<Layout.Main className="mx-auto my-8 h-full w-full max-w-4xl px-8">
			<Outlet />
		</Layout.Main>
	)
}
