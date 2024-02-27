import type { Preview, ReactRenderer } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { createRemixStub } from '@remix-run/testing'

import '../src/styles/styles.css'

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
		Story => {
			const RemixStub = createRemixStub([
				{
					path: '/',
					Component() {
						return <Story />
					},
				},
			])

			return <RemixStub />
		},

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
