import type { Meta, StoryObj } from '@storybook/react'
import { GitHubIconLink } from './social.tsx'

const meta = {
	title: 'Icons/GitHub',
	component: GitHubIconLink,
} satisfies Meta<typeof GitHubIconLink>

export default meta

type Story = StoryObj<typeof meta>

export const GitHub = {
	render: ({ ...args }) => <GitHubIconLink {...args} />,
	argTypes: {
		onClick: { action: 'clicked' },
	},
} satisfies Story
