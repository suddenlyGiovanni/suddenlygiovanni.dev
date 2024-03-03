import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.h2,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.h2>

type Story = StoryObj<typeof meta>

export default meta

export const H2: Story = {
	render: args => <T.h2 {...args}>The People of the Kingdom</T.h2>,
}
