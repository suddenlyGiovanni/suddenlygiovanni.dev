import type { Meta, StoryObj } from '@storybook/react'
import { TwitterIconLink } from './social.tsx'

const meta = {
	title: 'Icons/Twitter',
	component: TwitterIconLink,
} satisfies Meta<typeof TwitterIconLink>

export default meta

type Story = StoryObj<typeof meta>

export const Twitter = {
	render: ({ ...args }) => <TwitterIconLink {...args} />,
	argTypes: {
		onClick: { action: 'clicked' },
	},
} satisfies Story
