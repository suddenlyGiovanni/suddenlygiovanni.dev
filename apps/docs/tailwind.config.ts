import type {Config} from 'tailwindcss'
import sharedConfig from '@suddenly-giovanni/config-tailwind'

const config = {
  content: ['./stories/**/*.tsx'],
  presets: [sharedConfig],
} satisfies Pick<Config, 'content' | 'presets'>


export default config
