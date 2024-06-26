import sharedConfig, { type Config } from '@suddenlygiovanni/config-tailwind/tailwind.config.ts'

const config: Config = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
}

// biome-ignore lint/style/noDefaultExport: This is a configuration file
export default config
