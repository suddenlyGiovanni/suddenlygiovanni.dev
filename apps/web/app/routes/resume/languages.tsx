import type { ReactElement } from 'react'

import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'

import type { Language } from '~/.server/schemas/resume/language.ts'

export function Languages({
	languages,
}: {
	readonly languages: readonly Language[]
}): ReactElement {
	return (
		<section class="w-full">
			<T.h2>Languages</T.h2>
			<table class="w-full">
				<thead>
					<T.tr>
						<th>Language</th>
						<th>Fluency</th>
					</T.tr>
				</thead>
				<tbody>
					{languages.map(({ fluency, language }) => (
						<T.tr key={language}>
							<T.td>{language}</T.td>
							<T.td>{fluency}</T.td>
						</T.tr>
					))}
				</tbody>
			</table>
		</section>
	)
}
