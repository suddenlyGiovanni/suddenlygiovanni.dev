import type { Meta, StoryObj } from '@storybook/react-vite'

import { T } from './typography.tsx'

const meta: Meta<typeof T.code> = {
	component: T.code,
	decorators: Story => (
		<div className="flex min-h-96 w-full items-center justify-center p-10">
			<Story />
		</div>
	),
}

export const Code: StoryObj<typeof meta> = {
	args: {
		children: '@radix-ui/react-alert-dialog',
	},
}

export default meta
