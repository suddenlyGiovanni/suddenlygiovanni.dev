import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	component: Layout.Header,
} satisfies Meta<typeof Layout.Header>

export default meta

type Story = StoryObj<typeof meta>

export const Header = {
	args: {
		children: <Placeholder />,
	},
} satisfies Story
