/**
 * If you want to use other PostCSS plugins, see the following:
 * https://tailwindcss.com/docs/using-with-preprocessors
 */
declare const config: {
	plugins: {
		// biome-ignore lint/suspicious/noExplicitAny: this is a configuration file
		tailwindcss: Record<string, any>
		// biome-ignore lint/suspicious/noExplicitAny: this is a configuration file
		autoprefixer: Record<string, any>
	}
}
// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config
export type { Config } from 'postcss-load-config'
