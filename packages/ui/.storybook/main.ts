import type { StorybookConfig } from '@storybook/react-vite'

// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url';


async function defineConfig(config: StorybookConfig): Promise<StorybookConfig> {
	return config
}

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
	const modulePath = join(value, 'package.json');
	const resolvedPath =  import.meta.resolve(modulePath);
	return dirname(fileURLToPath(resolvedPath));
}


export default defineConfig({
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		 getAbsolutePath('@storybook/addon-onboarding'),
		 getAbsolutePath('@storybook/addon-links'),
		 getAbsolutePath('@storybook/addon-essentials'),
		 getAbsolutePath('@chromatic-com/storybook'),
		 getAbsolutePath('@storybook/addon-interactions'),
		 getAbsolutePath('@storybook/addon-themes'),
		 getAbsolutePath('@storybook/addon-a11y'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
		options: {
			strictMode: true,
		},
	},
	docs: {},
	staticDirs: [
		// make sure we are serving the same assets as the Remix app
		'../../../apps/web/public',
	],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
})
