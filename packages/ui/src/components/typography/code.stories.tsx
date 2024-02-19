import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.code,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.code>

type Story = StoryObj<typeof meta>

export default meta

export const Code: Story = {
	render: args => <T.code {...args}> @radix-ui/react-alert-dialog</T.code>,
}
