import { useRef, type ComponentProps } from 'react'
import type { Meta } from '@storybook/react'
import { BellIcon, CheckIcon } from '@radix-ui/react-icons'
import { clsx } from 'src/lib/utils.ts'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Switch } from '../../ui/switch.tsx'

const meta = {
	component: Card.Root,
} satisfies Meta<typeof Card.Root>

const notifications = [
	{
		title: 'Your call has been confirmed.',
		description: '1 hour ago',
	},
	{
		title: 'You have a new message!',
		description: '1 hour ago',
	},
	{
		title: 'Your subscription is expiring soon!',
		description: '2 hours ago',
	},
]

type CardProps = ComponentProps<typeof Card.Root>

export function CardDemo({ className, ...props }: CardProps) {
	const pRef = useRef(null)
	return (
		<Card.Root className={clsx('w-[380px]', className)} {...props}>
			<Card.Header>
				<Card.Title>Notifications</Card.Title>
				<Card.Description>You have 3 unread messages.</Card.Description>
			</Card.Header>
			<Card.Content className="grid gap-4">
				<div className="flex items-center space-x-4 rounded-md border p-4">
					<BellIcon />
					<div className="flex-1 space-y-1">
						<p className="font-medium text-sm leading-none">Push Notifications</p>
						<p className="text-muted-foreground text-sm">Send notifications to device.</p>
					</div>
					<Switch />
				</div>
				<div>
					{notifications.map((notification, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="font-medium text-sm leading-none">{notification.title}</p>
								<p className="text-muted-foreground text-sm" ref={pRef}>
									{notification.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</Card.Content>
			<Card.Footer>
				<Button className="w-full">
					<CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
				</Button>
			</Card.Footer>
		</Card.Root>
	)
}

export default meta
