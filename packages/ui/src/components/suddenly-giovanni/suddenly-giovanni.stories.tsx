import type { Meta, StoryObj } from '@storybook/react'
import { SuddenlyGiovanni } from './suddenly-giovanni'

const meta = {
	component: SuddenlyGiovanni,
} satisfies Meta<typeof SuddenlyGiovanni>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
