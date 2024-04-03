import { T } from '@suddenly-giovanni/ui/components/typography/typography.tsx'
import type { ReactElement } from 'react'
import type { Language } from '~/routes/resume/server.schema/language.ts'

export function Languages({
	languages,
}: {
	readonly languages: readonly Language[]
}): ReactElement {
	return (
		<section className="w-full">
			<T.h2>Languages</T.h2>
			<table className="w-full">
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
