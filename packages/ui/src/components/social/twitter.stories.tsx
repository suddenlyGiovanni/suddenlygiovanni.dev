import type { Meta, StoryObj } from '@storybook/react'
import { TwitterIconLink } from './social.tsx'

const meta = {
	component: TwitterIconLink,
} satisfies Meta<typeof TwitterIconLink>

export const Twitter: StoryObj<typeof meta> = {
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

// biome-ignore lint/nursery/useComponentExportOnlyModules: Storybook convention
export default meta
