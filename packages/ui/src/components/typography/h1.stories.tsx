import type { Meta, StoryObj } from '@storybook/react-vite'

import { T } from './typography.tsx'

const meta: Meta<typeof T.h1> = {
	component: T.h1,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const H1: StoryObj<typeof meta> = {
	args: {
		children: 'Taxing Laughter: The Joke Tax Chronicles',
	},
}

export default meta
