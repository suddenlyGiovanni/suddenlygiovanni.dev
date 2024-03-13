import type { Meta, StoryObj } from '@storybook/react'
import { T } from './typography.tsx'

const meta: Meta<typeof T.h3> = {
	component: T.h3,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const H3: StoryObj<typeof meta> = {
	args: {
		children: 'The Joke Tax',
	},
}

export default meta
