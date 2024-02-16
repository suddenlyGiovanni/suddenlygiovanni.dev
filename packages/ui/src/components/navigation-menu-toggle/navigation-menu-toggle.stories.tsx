import type {Meta, StoryObj} from '@storybook/react'
import {NavigationMenuToggle} from './navigation-menu-toggle.tsx'

const meta: Meta<typeof NavigationMenuToggle> = {
	component: NavigationMenuToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
}

export default meta

export const Example: StoryObj<typeof meta> = {
	render: args => <NavigationMenuToggle {...args}>Pin</NavigationMenuToggle>,
}
