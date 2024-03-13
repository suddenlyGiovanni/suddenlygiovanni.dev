import type { Meta, StoryObj } from '@storybook/react'
import { type ReactElement, useState } from 'react'
import { ModeToggle, Theme } from './mode-toggle.tsx'

const meta: Meta<typeof ModeToggle> = {
	component: ModeToggle,
}

export function Default(args: StoryObj<typeof ModeToggle>['args']): ReactElement {
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
	return <ModeToggle {...args} setTheme={setTheme} theme={theme} />
}

export default meta
