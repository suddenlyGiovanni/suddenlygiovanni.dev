import type { Config } from 'tailwindcss'
import sharedConfig from '@suddenly-giovanni/config-tailwind'

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
	content: ['./src/**/*.tsx'],
	presets: [sharedConfig],
}

export default config
