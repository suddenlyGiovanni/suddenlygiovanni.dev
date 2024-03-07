/* eslint-disable react/function-component-definition -- Reason: storybook story */
import type { Meta, StoryFn } from '@storybook/react'
import { Skeleton } from '../../ui/skeleton'

const meta = {
	component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryFn<typeof meta>

export const SkeletonDemo: Story = args => (
	<div className="flex items-center space-x-4">
		<Skeleton className="h-12 w-12 rounded-full" {...args} />
		<div className="space-y-2">
			<Skeleton className="h-4 w-[250px]" />
			<Skeleton className="h-4 w-[200px]" />
		</div>
	</div>
)

export const SkeletonCard: Story = args => (
	<div className="flex flex-col space-y-3">
		<Skeleton className="h-[125px] w-[250px] rounded-xl" {...args} />
		<div className="space-y-2">
			<Skeleton className="h-4 w-[250px]" />
			<Skeleton className="h-4 w-[200px]" />
		</div>
	</div>
)
