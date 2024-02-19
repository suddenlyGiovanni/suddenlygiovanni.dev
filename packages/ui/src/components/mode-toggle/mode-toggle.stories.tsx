import type { Meta, StoryObj } from '@storybook/react'
import { ModeToggle } from './mode-toggle.tsx'

const meta = {
	component: ModeToggle,
} satisfies Meta<typeof ModeToggle>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: args => <ModeToggle {...args} />,
	argTypes: {
		setTheme: { action: `setTheme` },
	},
}
