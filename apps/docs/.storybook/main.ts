import { dirname, join } from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

const config = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
} satisfies StorybookConfig
export default config

function getAbsolutePath<T extends string>(value: T) {
	return dirname(require.resolve(join(value, 'package.json')))
}
