import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	title: 'Layout/Header',
	component: Layout.Header,
} satisfies Meta<typeof Layout.Header>

export default meta

type Story = StoryObj<typeof meta>

export const Header: Story = {
	decorators: [
		Story => (
			<Layout.Body
				as="div"
				className="border-dashed border-violet-500 bg-violet-200 text-center text-xl text-violet-500"
			>
				Body
				<Story />
			</Layout.Body>
		),
	],
	render: ({ children: _, ...args }) => (
		<Layout.Header {...args}>
			<Placeholder>Header</Placeholder>
		</Layout.Header>
	),
}
