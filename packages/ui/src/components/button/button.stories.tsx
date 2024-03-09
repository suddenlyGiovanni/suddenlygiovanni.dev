import { ChevronRightIcon, EnvelopeOpenIcon, ReloadIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { T } from '~/components/typography/typography.tsx'
import { Button } from '~/ui/button.tsx'

const meta = {
	component: Button,
	argTypes: {
		onClick: { action: 'clicked' },
		variant: {
			control: 'radio',
			options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
		},
	},
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
		variant: 'outline',
		size: 'icon',
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
		<Button {...args} disabled>
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			Please wait
		</Button>
	),
}

export const AsChild: Story = {
	render: args => (
		<Button {...args} asChild>
			<T.a>Login</T.a>
		</Button>
	),
}
