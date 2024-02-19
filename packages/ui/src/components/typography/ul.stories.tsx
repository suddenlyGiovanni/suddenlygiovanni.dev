import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta = {
	component: T.ul,
	title: 'typography',
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
} satisfies Meta<typeof T.ul>

type Story = StoryObj<typeof meta>

export default meta

export const Ul: Story = {
	render: args => (
		<T.ul {...args}>
			<li>1st level of puns: 5 gold coins</li>
			<li>2nd level of jokes: 10 gold coins</li>
			<li>3rd level of one-liners : 20 gold coins</li>
		</T.ul>
	),
}
