import type { Meta, StoryObj } from '@storybook/react'

import { T } from './typography.tsx'

const meta: Meta<typeof T.blockquote> = {
	component: T.blockquote,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Blockquote: StoryObj<typeof meta> = {
	render: args => (
		<T.blockquote {...args}>
			"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for
			the privilege."
		</T.blockquote>
	),
}

export default meta
