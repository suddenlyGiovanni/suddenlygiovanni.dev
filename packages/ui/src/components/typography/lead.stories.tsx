import type { Meta, StoryObj } from '@storybook/react-vite'

import { T } from './typography.tsx'

const meta: Meta<typeof T.lead> = {
	component: T.lead,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Lead: StoryObj<typeof meta> = {
	args: {
		children:
			'A modal dialog that interrupts the user with important content and expects a response.',
	},
}

export default meta
