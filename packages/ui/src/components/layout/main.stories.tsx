import type { Meta, StoryObj } from '@storybook/react'

import { Placeholder } from '../placeholder/placeholder.tsx'
import { Layout } from './layout.tsx'

const meta = {
	component: Layout.Main,
} satisfies Meta<typeof Layout.Main>

type Story = StoryObj<typeof meta>

export const Main: Story = {
	decorators: [
		story => (
			<Layout.Body
				as="div"
				className="border-violet-500 border-dashed bg-violet-200 text-center text-violet-500 text-xl"
			>
				Body
				{story()}
			</Layout.Body>
		),
	],
	render: ({ children: _, ...args }) => (
		<Layout.Main {...args}>
			<Placeholder>Main</Placeholder>
		</Layout.Main>
	),
}

// biome-ignore lint/nursery/useComponentExportOnlyModules: Storybook convention
export default meta
