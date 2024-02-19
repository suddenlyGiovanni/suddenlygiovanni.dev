import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.large,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.large>

type Story = StoryObj<typeof meta>

export default meta

export const Large: Story = {
	render: args => <T.large {...args}>Are you absolutely sure?</T.large>,
}
