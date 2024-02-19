import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.lead,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.lead>

type Story = StoryObj<typeof meta>

export default meta

export const Lead: Story = {
	render: args => (
		<T.lead {...args}>
			A modal dialog that interrupts the user with important content and expects a response.
		</T.lead>
	),
}
