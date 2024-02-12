import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	title: 'Layout/Header',
	component: Layout.Header,
} satisfies Meta<typeof Layout.Header>

export default meta

type Story = StoryObj<typeof meta>

export const Header = {
	decorators: [
		Story => (
			<Layout.Body className="border-dashed border-violet-500 bg-violet-200 text-center text-xl text-violet-500">
				Body
				<Story />
			</Layout.Body>
		),
	],
	render: ({ children, ...args }) => (
		<Layout.Header {...args}>
			<Placeholder>Header</Placeholder>
		</Layout.Header>
	),
} satisfies Story
