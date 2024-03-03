import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.h3,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.h3>

type Story = StoryObj<typeof meta>

export default meta

export const H3: Story = {
	render: args => <T.h3 {...args}>The Joke Tax</T.h3>,
}
