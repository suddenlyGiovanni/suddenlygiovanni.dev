import sharedConfig from '@suddenly-giovanni/config-tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config = {
	content: ['./app/**/*.tsx'],
	presets: [sharedConfig],
} satisfies Pick<Config, 'content' | 'presets'>

export default config
