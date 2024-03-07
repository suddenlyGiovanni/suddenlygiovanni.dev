import type { Meta, StoryObj } from '@storybook/react'
import { type ReactElement, useState } from 'react'
import { ModeToggle } from './mode-toggle.tsx'

const meta = {
	component: ModeToggle,
} satisfies Meta<typeof ModeToggle>

export default meta

export function Default(args: StoryObj<typeof ModeToggle>['args']): ReactElement {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	return <ModeToggle {...args} setTheme={setTheme} theme={theme} />
}
