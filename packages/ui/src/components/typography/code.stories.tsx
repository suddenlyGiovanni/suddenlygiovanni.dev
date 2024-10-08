import type { Meta, StoryObj } from '@storybook/react'
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

// biome-ignore lint/nursery/useComponentExportOnlyModules: Storybook convention
export default meta
