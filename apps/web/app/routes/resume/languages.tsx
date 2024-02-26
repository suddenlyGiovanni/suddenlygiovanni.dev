import { T } from '@suddenly-giovanni/ui'
import type { Language } from './interface.ts'

export function Languages({ languages }: { readonly languages: readonly Language[] }) {
	return (
		<section className="w-full">
			<T.h2>Languages</T.h2>
			<dl>
				{languages.map(({ fluency, language }) => (
					<div
						className="flex items-center justify-start "
						key={language}
					>
						<dt className="mb-0">{language}</dt>
						<dd className="mb-0 ml-4">{fluency}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
