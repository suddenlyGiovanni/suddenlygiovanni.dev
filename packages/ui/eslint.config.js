import { config } from '@repo/eslint-config/react-internal'
import { defineConfig } from 'eslint/config'
import storybook from 'eslint-plugin-storybook'

export default defineConfig([...config, ...storybook.configs['flat/recommended']])
