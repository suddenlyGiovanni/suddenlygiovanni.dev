import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.muted,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.muted>

type Story = StoryObj<typeof meta>

export default meta

export const Muted: Story = {
	render: args => <T.muted {...args}>Enter your email address.</T.muted>,
}
