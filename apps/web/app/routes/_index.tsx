import type { MetaFunction } from '@remix-run/node'
import type { JSX } from 'react'

export const meta: MetaFunction = () => {
	return [{ title: 'About me' }, { name: 'description', content: 'All about Giovanni Ravalico' }]
}

export default function Index(): JSX.Element {
	return <div>About me page</div>
}
