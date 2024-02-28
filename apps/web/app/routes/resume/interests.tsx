import { T } from '@suddenly-giovanni/ui'
import type { Interest } from './interface.ts'

export function Interests({ interests }: { readonly interests: readonly Interest[] }) {
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
									className="mb-0 mr-4"
									key={keyword}
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
