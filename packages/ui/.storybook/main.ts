import type { StorybookConfig } from '@storybook/react-vite'

const defineConfig = (config: StorybookConfig): StorybookConfig => config

export default defineConfig({
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'@storybook/addon-a11y',
	],
	docs: {},
	framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: true,
		},
	},
	staticDirs: [
		// make sure we are serving the same assets as the Remix app
		'../../app/public',
	],
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
})
