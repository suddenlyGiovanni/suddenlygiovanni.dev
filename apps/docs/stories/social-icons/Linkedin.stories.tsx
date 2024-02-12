import type { Meta, StoryObj } from '@storybook/react'
import { LinkedInIconLink } from '@suddenly-giovanni/ui'

const meta = {
	title: 'Icons/LinkedIn',
	component: LinkedInIconLink,
} satisfies Meta<typeof LinkedInIconLink>

export default meta

type Story = StoryObj<typeof meta>

export const LinkedIn = {
	render: ({ ...args }) => <LinkedInIconLink {...args} />,
	argTypes: {
		onClick: { action: 'clicked' },
	},
} satisfies Story
