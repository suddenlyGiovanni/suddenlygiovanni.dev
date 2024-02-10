import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	component: Placeholder,
} satisfies Meta<typeof Placeholder>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {
	args: {},
} satisfies Story
