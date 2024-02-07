/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalTernaries: true,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'all',
  useTabs: true,
}

export default config
