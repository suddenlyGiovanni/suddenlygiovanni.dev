import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.h1,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.h1>

type Story = StoryObj<typeof meta>

export default meta

export const H1: Story = {
	render: args => <T.h1 {...args}>Taxing Laughter: The Joke Tax Chronicles</T.h1>,
}
