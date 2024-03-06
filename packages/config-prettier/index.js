/**
 * @type {import('prettier').Config}
 */
const config = {
	arrowParens: 'avoid',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	experimentalTernaries: false,
	jsxSingleQuote: false,
	plugins: ['prettier-plugin-tailwindcss'],
	printWidth: 100,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	tailwindFunctions: ['tv', 'cn'],
}

// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config
