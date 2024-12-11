import type { ReactElement, ReactNode } from 'react'

import { Layout } from '@suddenlygiovanni/ui/components/layout/layout.tsx'

export function Main({ children }: { children: ReactNode }): ReactElement {
	return <Layout.Main className="mx-auto my-8 h-full w-full max-w-4xl px-8">{children}</Layout.Main>
}
