import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from '@/components/placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	component: Layout.Header,
} satisfies Meta<typeof Layout.Header>

type Story = StoryObj<typeof meta>

export const Header: Story = {
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
		<Layout.Header {...args}>
			<Placeholder>Header</Placeholder>
		</Layout.Header>
	),
}

export default meta
