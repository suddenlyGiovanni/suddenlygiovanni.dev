import pluginReact from 'eslint-plugin-react'
import * as reactHooks from 'eslint-plugin-react-hooks'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
	...baseConfig,
	pluginReact.configs.flat.recommended,
	reactHooks.configs.recommended,
]
