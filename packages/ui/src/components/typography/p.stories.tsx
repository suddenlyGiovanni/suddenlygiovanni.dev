import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.p,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.p>

type Story = StoryObj<typeof meta>

export default meta

export const P: Story = {
	render: args => (
		<T.p {...args}>
			The king, seeing how much happier his subjects were, realized the error of his ways and
			repealed the joke tax.
		</T.p>
	),
}
