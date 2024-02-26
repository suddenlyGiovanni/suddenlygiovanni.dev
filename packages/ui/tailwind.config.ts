import sharedConfig, { type Config } from '@suddenly-giovanni/config-tailwind/tailwind.config.ts'

const config: Config = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
}

export default config
