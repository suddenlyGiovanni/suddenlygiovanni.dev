import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.blockquote,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.blockquote>

type Story = StoryObj<typeof meta>

export default meta

export const Blockquote: Story = {
	render: args => (
		<T.blockquote {...args}>
			"After all," he said, "everyone enjoys a good joke, so it's only fair that they should
			pay for the privilege."
		</T.blockquote>
	),
}
