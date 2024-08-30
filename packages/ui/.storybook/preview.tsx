import { createRemixStub } from '@remix-run/testing'
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react'
import type { ReactNode } from 'react'

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
		story => {
			const RemixStub = createRemixStub([
				{
					path: '/',
					// biome-ignore lint/style/useNamingConvention: <explanation>
					Component: (): ReactNode => story(),
				},
			])

			return <RemixStub />
		},

		withThemeByClassName<ReactRenderer>({
			...themeConfig,
		}),
		withThemeByDataAttribute<ReactRenderer>({
			...themeConfig,
			attributeName: 'data-theme',
		}),
	],

	tags: ['autodocs'],
}

// biome-ignore lint/style/noDefaultExport: it is part of the api
export default preview
