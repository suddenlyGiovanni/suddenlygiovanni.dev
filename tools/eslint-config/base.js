import tseslint from 'typescript-eslint'
import 'eslint-plugin-only-warn'

/**
 * A shared ESLint configuration for the repository.
 */
export const config = tseslint.config(tseslint.configs.recommended)
