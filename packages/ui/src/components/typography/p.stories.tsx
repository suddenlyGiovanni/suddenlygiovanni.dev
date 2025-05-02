import type { Meta, StoryObj } from '@storybook/react'

import { T } from './typography.tsx'

const meta: Meta<typeof T.p> = {
	component: T.p,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const P: StoryObj<typeof meta> = {
	args: {
		children:
			'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
	},
}

export default meta
