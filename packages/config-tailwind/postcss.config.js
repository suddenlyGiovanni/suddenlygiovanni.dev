/**
 * If you want to use other PostCSS plugins, see the following:
 * https://tailwindcss.com/docs/using-with-preprocessors
 * @type { import('postcss-load-config').Config };
 */
const config = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
}
// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config
