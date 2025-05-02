import type { Meta, StoryObj } from '@storybook/react'

import { GitHubIconLink } from './social.tsx'

const meta = {
	component: GitHubIconLink,
} satisfies Meta<typeof GitHubIconLink>

export const GitHub: StoryObj<typeof meta> = {
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

export default meta
