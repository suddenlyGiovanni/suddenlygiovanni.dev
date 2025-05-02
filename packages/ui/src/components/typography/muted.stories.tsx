import type { Meta, StoryObj } from '@storybook/react'

import { T } from './typography.tsx'

const meta: Meta<typeof T.muted> = {
	component: T.muted,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Muted: StoryObj<typeof meta> = {
	args: {
		children: 'Enter your email address.',
	},
}

export default meta
