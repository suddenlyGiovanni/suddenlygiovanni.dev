/**
 * If you want to use other PostCSS plugins, see the following:
 * https://tailwindcss.com/docs/using-with-preprocessors
 */
declare const config: {
	plugins: {
		tailwindcss: {};
		autoprefixer: {};
	};
};
// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config;
export { type Config } from "postcss-load-config";
//# sourceMappingURL=postcss.config.d.ts.map
