import type { Meta, StoryObj } from '@storybook/react-vite'

import { NavigationMenuToggle } from './navigation-menu-toggle.tsx'

const meta: Meta<typeof NavigationMenuToggle> = {
	component: NavigationMenuToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof meta> = {
	render: args => <NavigationMenuToggle {...args} />,
}
