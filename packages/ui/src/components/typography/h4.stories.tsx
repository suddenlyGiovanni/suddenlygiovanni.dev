import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.h4,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.h4>

type Story = StoryObj<typeof meta>

export default meta

export const H4: Story = {
	render: args => <T.h4 {...args}>People stopped telling jokes</T.h4>,
}
