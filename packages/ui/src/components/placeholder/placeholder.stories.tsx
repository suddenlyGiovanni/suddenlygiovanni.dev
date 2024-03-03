import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from './placeholder.tsx'

const meta = {
	component: Placeholder,
	decorators: [
		Story => (
			<div className="flex items-center justify-center bg-blue-200 p-8">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Placeholder>

type Story = StoryObj<typeof meta>

export default meta

export const Base: Story = {}

// Story variants for your Placeholder component with different container constraints

export const SmallSize: Story = {
	decorators: [
		Story => (
			<div className="w-1/4 rounded bg-green-200 p-4">
				<Story />
			</div>
		),
	],
}

export const MediumSize: Story = {
	decorators: [
		Story => (
			<div className="w-1/2 rounded bg-green-200 p-4">
				<Story />
			</div>
		),
	],
}

export const LargeSize: Story = {
	decorators: [
		Story => (
			<div className="w-full rounded bg-green-200 p-4">
				<Story />
			</div>
		),
	],
}
