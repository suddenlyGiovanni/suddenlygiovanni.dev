import { CheckIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from '../../ui/badge.tsx'

const meta = {
	component: Badge,
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: 'Default',
		variant: 'default',
	},
}

export const Secondary: Story = {
	args: {
		children: 'Secondary',
		variant: 'secondary',
	},
}

export const Outline: Story = {
	args: {
		children: 'Outline',
		variant: 'outline',
	},
}

export const Destructive: Story = {
	args: {
		children: 'Destructive',
		variant: 'destructive',
	},
}

export const WithIcon: Story = {
	args: {
		children: (
			<div className="flex items-center gap-1">
				<CheckIcon />
				<span>icon</span>
			</div>
		),
		variant: 'destructive',
	},
}

export default meta
