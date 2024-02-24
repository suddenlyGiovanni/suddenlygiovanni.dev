import type { Interest } from './interface.ts'

export function Interests({ interests }: { readonly interests: readonly Interest[] }) {
	return (
		<section>
			<h2>Interests</h2>
			{interests.map(({ name, keywords }) => (
				<dl>
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
