import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	component: Layout.Main,
	decorators: [
		Story => (
			<Layout.Body>
				<Story />
			</Layout.Body>
		),
	],
} satisfies Meta<typeof Layout.Main>

export default meta

type Story = StoryObj<typeof meta>

export const Main = {
	render: ({ className, ...args }) => (
		<Layout.Main
			className={`bg-gray-200 ${className}`}
			{...args}
		/>
	),
	args: {
		children: <Placeholder />,
	},
} satisfies StoryObj<typeof meta>
