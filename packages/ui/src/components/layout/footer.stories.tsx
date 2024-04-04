import type { Meta, StoryObj } from '@storybook/react'

import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	component: Layout.Footer,
} satisfies Meta<typeof Layout.Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Footer: Story = {
	decorators: [
		Story => (
			<Layout.Body
				as="div"
				className="border-violet-500 border-dashed bg-violet-200 text-center text-violet-500 text-xl"
			>
				Body
				<Story />
			</Layout.Body>
		),
	],
	render: ({ children: _, ...args }) => (
		<Layout.Footer {...args}>
			<Placeholder>Footer</Placeholder>
		</Layout.Footer>
	),
}
