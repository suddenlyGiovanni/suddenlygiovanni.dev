import { DecoratorHelpers } from '@storybook/addon-themes'
import type { Decorator } from '@storybook/react-vite'
import { useEffect } from 'react'

export function withThemeByColorScheme<Themes extends Record<string, string>>({
	themes,
	defaultTheme,
}: {
	themes: Themes
	defaultTheme: keyof Themes
}): Decorator {
	DecoratorHelpers.initializeThemeState(Object.keys(themes), defaultTheme as string)
	return (storyFn, context) => {
		const { themeOverride } = DecoratorHelpers.useThemeParameters()
		const selected = DecoratorHelpers.pluckThemeFromContext(context)

		useEffect(() => {
			const parentElement = document.querySelector('html')
			const themeKey: keyof Themes | string = themeOverride || selected || defaultTheme

			if (parentElement) {
				parentElement.style.setProperty('color-scheme', String(themes[themeKey]))
			}
		}, [themeOverride, selected])

		return storyFn()
	}
}
