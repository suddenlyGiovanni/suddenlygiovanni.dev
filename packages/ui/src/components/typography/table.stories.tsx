import type { Meta } from '@storybook/react'
import type { ReactElement } from 'react'
import { T } from './typography.tsx'

const meta: Meta = {
	component: T.tr,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export function Table(): ReactElement {
	return (
		<div className="my-6 w-full overflow-y-auto">
			<table className="w-full">
				<thead>
					<T.tr>
						<T.th>King's Treasury</T.th>
						<T.th>People's happiness</T.th>
					</T.tr>
				</thead>
				<tbody>
					<T.tr>
						<T.td>Empty</T.td>
						<T.td>Overflowing</T.td>
					</T.tr>
					<T.tr>
						<T.td>Modest</T.td>
						<T.td>Satisfied</T.td>
					</T.tr>
					<T.tr>
						<T.td>Full</T.td>
						<T.td>Ecstatic</T.td>
					</T.tr>
				</tbody>
			</table>
		</div>
	)
}

export default meta
