import type { Meta, StoryObj } from '@storybook/react'
import { Layout, Placeholder } from '@suddenly-giovanni/ui'

const meta = {
	title: 'Layout/Body',
	component: Layout.Body,
} satisfies Meta<typeof Layout.Body>

export default meta

type Story = StoryObj<typeof meta>

export const Body = {
	render: ({ children, className, ...args }) => (
		<Layout.Body
			{...args}
			className="border-dashed border-violet-500 bg-violet-200 text-center text-xl text-violet-500"
		>
			Body
			<Layout.Header>
				<Placeholder className="border-green-500 bg-green-200 text-green-500">Header</Placeholder>
			</Layout.Header>
			<Layout.Main>
				<Placeholder className="border-sky-500 bg-sky-200 text-sky-500">Main</Placeholder>
			</Layout.Main>
			<Layout.Footer>
				<Placeholder className="border-purple-500 bg-purple-200 text-purple-500">
					Footer
				</Placeholder>
			</Layout.Footer>
		</Layout.Body>
	),
} satisfies Story
