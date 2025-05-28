import type { Meta, StoryObj } from '@storybook/react-vite'

import { LinkedInIconLink } from './social.tsx'

const meta = {
	component: LinkedInIconLink,
} satisfies Meta<typeof LinkedInIconLink>

export const LinkedIn: StoryObj<typeof meta> = {
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

export default meta
