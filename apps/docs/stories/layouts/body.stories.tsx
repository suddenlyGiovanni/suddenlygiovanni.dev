import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from '@suddenly-giovanni/ui'
import { Header } from './header.stories.tsx'
import { Main } from './main.stories.tsx'
import { Footer } from './footer.stories.tsx'

const meta = {
	component: Layout.Body,
} satisfies Meta<typeof Layout.Body>

export default meta

type Story = StoryObj<typeof meta>

export const BodyStory = {
	args: {
		// Add default props for Header here
		children: (
			<>
				<Header />
				<Main />
				<Footer />
			</>
		),
	},
} satisfies Story
