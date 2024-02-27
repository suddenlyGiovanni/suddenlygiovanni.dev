import type { Preview, ReactRenderer } from '@storybook/react'
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import { createRemixStub } from '@remix-run/testing'

import '../src/styles/styles.css'

const themeConfig = {
	themes: {
		light: 'light',
		dark: 'dark',
	},
	defaultTheme: 'light',
} as const

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
			...themeConfig,
		}),
		withThemeByDataAttribute<ReactRenderer>({
			...themeConfig,
			attributeName: 'data-mode',
		}),
	],
}

export default preview
