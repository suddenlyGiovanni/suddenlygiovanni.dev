import sharedConfig, { type Config } from '@suddenly-giovanni/config-tailwind/tailwind.config.ts'

const config = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
} satisfies Config

export default config
