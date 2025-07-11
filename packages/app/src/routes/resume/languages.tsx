import { T } from '@repo/ui/components/typography/typography.tsx'
import type * as Model from '@suddenly-giovanni/schema-resume'
import type { ReactElement } from 'react'

export function Languages({ languages }: { readonly languages: readonly Model.Language[] }): ReactElement {
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
