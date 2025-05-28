import type { Meta, StoryObj } from '@storybook/react-vite'

import { TwitterIconLink } from './social.tsx'

const meta = {
	component: TwitterIconLink,
} satisfies Meta<typeof TwitterIconLink>

export const Twitter: StoryObj<typeof meta> = {
	argTypes: {
		onClick: { action: 'clicked' },
	},
}

export default meta
