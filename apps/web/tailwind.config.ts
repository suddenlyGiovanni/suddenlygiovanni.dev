import sharedConfig, { type Config } from '@suddenly-giovanni/config-tailwind/tailwind.config.ts'

const config = {
	content: ['./app/**/*.tsx'],
	presets: [sharedConfig],
} satisfies Pick<Config, 'content' | 'presets'>

export default config
