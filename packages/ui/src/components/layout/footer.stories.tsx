import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	title: 'Layout/Footer',
	component: Layout.Footer,
} satisfies Meta<typeof Layout.Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Footer: Story = {
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
	render: ({ children, ...args }) => (
		<Layout.Footer {...args}>
			<Placeholder>Footer</Placeholder>
		</Layout.Footer>
	),
}
