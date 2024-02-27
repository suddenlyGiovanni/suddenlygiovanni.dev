import sharedConfig, { type Config } from '@suddenly-giovanni/config-tailwind/tailwind.config.ts'

const config: Pick<Config, 'content' | 'presets'> = {
	content: ['./app/**/*.tsx', '../../packages/ui/src/**/*.tsx'],
	presets: [sharedConfig],
}
export default config
