import type { Preview, ReactRenderer } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'

import '../dist/styles/styles.css'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on.*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		withThemeByClassName<ReactRenderer>({
			defaultTheme: 'light',
			themes: {
				light: 'light',
				dark: 'dark',
			},
		}),
	],
}

export default preview
