import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	title: 'Layout/Main',
	component: Layout.Main,
} satisfies Meta<typeof Layout.Main>

export default meta

type Story = StoryObj<typeof meta>

export const Main: Story = {
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
		<Layout.Main {...args}>
			<Placeholder>Main</Placeholder>
		</Layout.Main>
	),
}
