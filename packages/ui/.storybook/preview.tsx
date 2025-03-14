import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview, ReactRenderer } from '@storybook/react'
import type { ReactNode } from 'react'
import { createRoutesStub } from 'react-router'

import { withThemeByColorScheme } from './with_theme_by_color_scheme.tsx'

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
			const RemixStub = createRoutesStub([
				{
					path: '/',
					Component: (): ReactNode => story(),
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

	tags: ['autodocs'],
}

export default preview
