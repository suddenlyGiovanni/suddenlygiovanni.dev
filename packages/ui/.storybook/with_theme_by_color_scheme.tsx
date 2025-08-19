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
		const maybeThemes = DecoratorHelpers.useThemeParameters()
		const selected = DecoratorHelpers.pluckThemeFromContext(context)
		const themeKey: keyof Themes | string = maybeThemes?.themeOverride || selected || defaultTheme

		useEffect(() => {
			const parentElement = document.querySelector('html')

			if (parentElement) {
				parentElement.style.setProperty('color-scheme', String(themes[themeKey]))
			}
		}, [themeKey])

		return storyFn()
	}
}
