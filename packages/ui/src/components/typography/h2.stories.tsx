import type { Meta, StoryObj } from '@storybook/react-vite'

import { T } from './typography.tsx'

const meta: Meta<typeof T.h2> = {
	component: T.h2,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const H2: StoryObj<typeof meta> = {
	args: {
		children: 'The People of the Kingdom',
	},
}

export default meta
