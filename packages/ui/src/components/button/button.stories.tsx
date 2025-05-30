import { ChevronRightIcon, EnvelopeOpenIcon, ReloadIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#ui/button.tsx'

import { T } from '../typography/typography.tsx'

const meta = {
	argTypes: {
		onClick: { action: 'clicked' },
		variant: {
			control: 'radio',
			options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
		},
	},
	component: Button,
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const Primary: Story = {
	args: {
		children: 'Primary',
	},
}
export const Secondary: Story = {
	args: {
		children: 'Secondary',
		variant: 'secondary',
	},
}
export const Destructive: Story = {
	args: {
		children: 'Destructive',
		variant: 'destructive',
	},
}
export const Outline: Story = {
	args: {
		children: 'Outline',
		variant: 'outline',
	},
}

export const Ghost: Story = {
	args: {
		children: 'Ghost',
		variant: 'ghost',
	},
}
export const Icon: Story = {
	args: {
		children: <ChevronRightIcon className="h-4 w-4" />,
		size: 'icon',
		variant: 'outline',
	},
}
export const WithIcon: Story = {
	render: args => (
		<Button {...args}>
			<EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
		</Button>
	),
}

export const Loading: Story = {
	render: args => (
		<Button
			{...args}
			disabled={true}
		>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			Please wait
		</Button>
	),
}

export const AsChild: Story = {
	render: args => (
		<Button
			{...args}
			asChild={true}
		>
			<T.a href="#1">Login</T.a>
		</Button>
	),
}
