import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactElement } from 'react'

import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	component: Layout.Body,
} satisfies Meta<typeof Layout.Body>

type Story = StoryObj<typeof meta>

export const Body = {
	render({ children: _, className: __, ...args }): ReactElement {
		return (
			<Layout.Body
				{...args}
				asChild={true}
				className="border-violet-500 border-dashed bg-violet-200 text-center text-violet-500 text-xl"
			>
				<div>
					Body
					<Layout.Header>
						<Placeholder className="border-green-500 bg-green-200 text-green-500">Header</Placeholder>
					</Layout.Header>
					<Layout.Main>
						<Placeholder className="border-sky-500 bg-sky-200 text-sky-500">Main</Placeholder>
					</Layout.Main>
					<Layout.Footer>
						<Placeholder className="border-purple-500 bg-purple-200 text-purple-500">Footer</Placeholder>
					</Layout.Footer>
				</div>
			</Layout.Body>
		)
	},
} satisfies Story

export default meta
