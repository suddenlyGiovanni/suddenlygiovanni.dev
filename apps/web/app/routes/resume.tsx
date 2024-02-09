import type { MetaFunction } from '@remix-run/node'

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
	return <h2>Résumé page</h2>
}
