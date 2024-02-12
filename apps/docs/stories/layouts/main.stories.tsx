import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder, cn } from '@suddenly-giovanni/ui'

const meta = {
	title: 'Layout/Main',
	component: Layout.Main,
} satisfies Meta<typeof Layout.Main>

export default meta

type Story = StoryObj<typeof meta>

export const Main = {
	decorators: [
		Story => (
			<Layout.Body className="border-dashed border-violet-500 bg-violet-200 text-center text-xl text-violet-500">
				Body
				<Story />
			</Layout.Body>
		),
	],
	render: ({ children, ...args }) => (
		<Layout.Main {...args}>
			<Placeholder>Main</Placeholder>
		</Layout.Main>
	),
} satisfies StoryObj<typeof meta>
