import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta: Meta<typeof T.h4> = {
	component: T.h4,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const H4: StoryObj<typeof meta> = {
	args: {
		children: 'People stopped telling jokes',
	},
}

export default meta
