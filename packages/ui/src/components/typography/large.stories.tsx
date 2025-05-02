import type { Meta, StoryObj } from '@storybook/react'

import { T } from './typography.tsx'

const meta: Meta<typeof T.large> = {
	component: T.large,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Large: StoryObj<typeof meta> = {
	args: {
		children: 'Are you absolutely sure?',
	},
}

export default meta
