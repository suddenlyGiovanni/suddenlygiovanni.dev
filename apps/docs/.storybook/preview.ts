import type { Preview } from '@storybook/react'

import '@suddenly-giovanni/ui/styles.css'

const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
} satisfies Preview

export default preview