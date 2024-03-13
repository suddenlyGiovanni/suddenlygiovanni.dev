import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta: Meta<typeof T.small> = {
	component: T.small,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Small: StoryObj<typeof meta> = {
	args: {
		children: 'Email address',
	},
}

export default meta
