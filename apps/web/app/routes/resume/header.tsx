import { Link } from '@remix-run/react'
import { cn, T } from '@suddenly-giovanni/ui'
import type { ReactElement, ReactNode } from 'react'
import resumePdfAssetUrl from 'public/giovanni-ravalico-resume-2021.pdf?url'
import { routesRecord } from '~/routes-record.ts'

export function Header({
	name,
	label,
	children,
	summary,
}: {
	name: string
	label: string
	summary: string
	children: ReactNode
}): ReactElement {
	return (
		<header>
			<hgroup>
				<T.h1>{name}</T.h1>
				<T.h2>{label}</T.h2>
			</hgroup>
			<T.blockquote>{summary}</T.blockquote>
			<T.p>
				<em>
					If you consider me for a role, read through{' '}
					<Link
						className={cn('font-medium', 'text-primary', 'underline', 'underline-offset-4')}
						to={routesRecord.motivations.url}
					>
						my motivations
					</Link>{' '}
					first.
				</em>
			</T.p>
			{children}
			<T.muted>
				click on this link to download the pdf version of my resume{' '}
				<span aria-label="pdf" role="img">
					📜
				</span>{' '}
				<T.a download href={resumePdfAssetUrl} rel="noopener" target="_blank">
					giovanni-ravalico-resume.pdf
				</T.a>
			</T.muted>
		</header>
	)
}
