import type { ReactElement } from 'react'

import type * as Model from '@suddenly-giovanni/schema-resume'
import { T } from '@suddenly-giovanni/ui/components/typography/typography.tsx'

import { generateDjb2Hash } from '#root/client/routes/resume/generate-djb2-hash.ts'

export function Interests({
	interests,
}: { readonly interests: readonly Model.Interest[] }): ReactElement {
	return (
		<section className="w-full">
			<T.h2 className="mb-0">Interests</T.h2>
			{interests.map(({ name, keywords }) => (
				<dl key={name}>
					<dt>{name}</dt>
					<dd>
						<ul className="mb-0 ml-0 flex list-none flex-row flex-wrap items-start justify-start">
							{keywords?.map(keyword => (
								<li
									className="mr-4 mb-0"
									key={generateDjb2Hash(keyword)}
								>
									{keyword}
								</li>
							))}
						</ul>
					</dd>
				</dl>
			))}
		</section>
	)
}
