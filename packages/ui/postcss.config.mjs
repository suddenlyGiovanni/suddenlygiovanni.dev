import sharedPostcssConfig from '@suddenly-giovanni/config-tailwind/postcss.config.js'

/**
 * If you want to use other PostCSS plugins, see the following:
 * https://tailwindcss.com/docs/using-with-preprocessors
 */
/**  @type {import('@suddenly-giovanni/config-tailwind/postcss-config.js').Config} */
// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default {
	...sharedPostcssConfig,
}
