import type { Meta, StoryObj } from '@storybook/react'
import { type ReactElement, useState } from 'react'

import { ModeToggle, type Theme } from './mode-toggle.tsx'

const meta: Meta<typeof ModeToggle> = {
	component: ModeToggle,
}

export function Default(args: StoryObj<typeof ModeToggle>['args']): ReactElement {
	const [theme, setTheme] = useState<Theme>('light')
	return (
		<ModeToggle
			{...args}
			setTheme={setTheme}
			theme={theme}
		/>
	)
}

// biome-ignore lint/nursery/useComponentExportOnlyModules: Storybook convention
export default meta
