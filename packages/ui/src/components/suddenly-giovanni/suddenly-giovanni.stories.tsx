import type { Meta, StoryObj } from '@storybook/react'
import { SuddenlyGiovanni } from './suddenly-giovanni.tsx'

const meta = {
	component: SuddenlyGiovanni,
} satisfies Meta<typeof SuddenlyGiovanni>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		ariaLabel: 'LinkToBlog.description',
		hrefUrl: 'https://avatars.githubusercontent.com/u/18092367',
		to: '/blog',
	},
}
