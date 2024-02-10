import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	component: Layout.Footer,
} satisfies Meta<typeof Layout.Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Footer = {
	args: {
		children: <Placeholder />,
	},
} satisfies Story
