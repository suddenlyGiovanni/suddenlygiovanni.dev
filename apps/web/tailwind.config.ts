import type { Config } from 'tailwindcss'
import sharedConfig from '@suddenly-giovanni/config-tailwind'

const config: Pick<Config, 'content' | 'presets'> = {
	content: ['./app/**/*.tsx'],
	presets: [sharedConfig],
}

export default config
