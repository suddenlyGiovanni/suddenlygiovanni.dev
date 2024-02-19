import type { MetaFunction } from '@remix-run/node'
import { T } from '@suddenly-giovanni/ui'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Résumé' },
		{
			name: 'description',
			content:
				"Giovanni Ravalico's Résumé. A place where I showcase my professional experience and skills.",
		},
	]
}

export default function Blog(): JSX.Element {
	return <T.h2>Résumé page</T.h2>
}
