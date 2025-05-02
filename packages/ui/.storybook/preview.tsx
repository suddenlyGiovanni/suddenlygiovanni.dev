import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react'
import type { ReactNode } from 'react'
import { createRoutesStub } from 'react-router'

import { withThemeByColorScheme } from './with_theme_by_color_scheme.tsx'

import '../src/styles/styles.css'

const themeConfig = {
	defaultTheme: 'light',
	themes: {
		dark: 'dark',
		light: 'light',
	},
} as const

const preview: Preview = {
	decorators: [
		story => {
			const RemixStub = createRoutesStub([
				{
					Component: (): ReactNode => story(),
					path: '/',
				},
			])
			return <RemixStub />
		},

		withThemeByDataAttribute<ReactRenderer>({
			...themeConfig,
			attributeName: 'data-theme',
		}),
		withThemeByColorScheme(themeConfig),
	],

	parameters: {
		actions: { argTypesRegex: '^on.*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

	tags: ['autodocs'],
}

export default preview
