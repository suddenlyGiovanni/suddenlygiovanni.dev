import type { StorybookConfig } from '@storybook/react-vite'

import { dirname, join } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-onboarding'),
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('@storybook/addon-themes'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: [
		// make sure we are serving the same assets as the Remix app
		'../../../apps/web/public',
	],
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default config
