import type { Meta, StoryObj } from '@storybook/react'
import { LinkedInIconLink } from './social.tsx'

const meta = {
	component: LinkedInIconLink,
} satisfies Meta<typeof LinkedInIconLink>

export const LinkedIn: StoryObj<typeof meta> = {
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

// biome-ignore lint/nursery/useComponentExportOnlyModules: Storybook convention
export default meta
