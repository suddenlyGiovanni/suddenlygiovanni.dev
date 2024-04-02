import basePrettier from '@suddenly-giovanni/config-prettier'

/** @type {import('prettier').Config} */
const config = {
	...basePrettier,
}

// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config
