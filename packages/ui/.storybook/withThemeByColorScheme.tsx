import {DecoratorHelpers} from '@storybook/addon-themes'
import {Decorator} from '@storybook/react'
import {useEffect} from 'react'


export interface DataAttributeStrategyConfiguration<Themes extends Record<string, string> = Record<string, string>> {
	themes: Record<string, string>;
	defaultTheme: keyof Themes;
	parentSelector?: string;
	attributeName?: string;
}


export const withThemeByColorScheme = ({
	                                       themes,
	                                       defaultTheme,
                                       }: DataAttributeStrategyConfiguration): Decorator => {
	DecoratorHelpers.initializeThemeState(Object.keys(themes), defaultTheme)
	return (storyFn, context) => {
		const {themeOverride} = DecoratorHelpers.useThemeParameters()
		const selected = DecoratorHelpers.pluckThemeFromContext(context)

		useEffect(() => {
			const parentElement = document.querySelector('html')
			const themeKey = themeOverride || selected || defaultTheme

			if (parentElement) {
				parentElement.style.setProperty('color-scheme', String(themes[themeKey]))
			}
		}, [themeOverride, selected])

		return storyFn()
	}
}
