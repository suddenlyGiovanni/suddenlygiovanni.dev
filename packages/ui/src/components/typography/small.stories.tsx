import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.small,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.small>

type Story = StoryObj<typeof meta>

export default meta

export const Small: Story = {
	render: args => <T.small {...args}>Email address</T.small>,
}
