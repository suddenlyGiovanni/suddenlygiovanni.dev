import { Icons, cn } from '@suddenly-giovanni/ui'
import type { ComponentProps } from 'react'

export function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

function DescriptionDetailsHighlights({
	highlights,
	...ddProps
}: ComponentProps<'dd'> & {
	highlights: readonly string[]
}) {
	return (
		<dd {...ddProps}>
			<ul
				aria-label="highlights"
				className={cn('mb-0 ml-0 list-none')}
			>
				{highlights.map((highlight, i) => (
					<li
						className="pl-0"
						key={`${i}${highlight[0]}`}
					>
						{highlight}
					</li>
				))}
			</ul>
		</dd>
	)
}

function DescriptionDetailsSummary({
	summary,
	...props
}: { readonly summary: string } & React.ComponentProps<'dd'>) {
	return <dd {...props}>{summary}</dd>
}

const spanClasses = cn('flex flex-row items-center text-sm font-normal italic accent-muted')

function DescriptionTerm({
	heading1AriaLabel,
	heading1,
	heading2,
	heading2AriaLabel,
	heading2Link,
	startDate,
	endDate,
	location,
	description,
}: {
	readonly heading1: string
	readonly heading1AriaLabel: string
	readonly heading2: string
	readonly heading2AriaLabel: string
	readonly heading2Link?: string
	readonly startDate?: Date
	readonly endDate?: Date
	readonly location?: string
	readonly description?: string
}) {
	return (
		<dt className="flex w-full flex-col">
			<h3
				aria-label={heading1AriaLabel}
				className={cn('mb-0 mt-0 text-base font-bold leading-none')}
			>
				{heading1}
			</h3>

			<span
				aria-label={heading2AriaLabel}
				className={cn(spanClasses, 'text-base font-medium not-italic')}
			>
				{heading2}
				{heading2Link ?
					<a
						className="ml-1"
						href={heading2Link}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icons.link2 aria-label={`link to ${heading2} ${heading2AriaLabel}`} />
					</a>
				:	null}
			</span>

			<span className={cn(spanClasses, 'justify-between')}>
				{startDate ?
					<span aria-label="start date / end date">
						<time
							className="mr-1"
							dateTime={startDate.toISOString()}
						>
							{formatDateLocaleShort(startDate)}
						</time>
						{endDate ?
							<>
								-
								<time
									className="ml-1"
									dateTime={endDate.toISOString()}
								>
									{formatDateLocaleShort(endDate)}
								</time>
							</>
						:	null}
					</span>
				:	null}

				{location ?
					<span aria-label="location">{location}</span>
				:	null}
			</span>

			{description ?
				<span
					aria-label="description"
					className={spanClasses}
				>
					{description}
				</span>
			:	null}
		</dt>
	)
}

export function SectionItem({
	heading1,
	heading1AriaLabel,
	heading2,
	heading2AriaLabel,
	heading2Link,
	startDate,
	endDate,
	location,
	description,
	summary,
	highlights,
	children,
	...dlProps
}: {
	readonly heading1: string
	readonly heading1AriaLabel: string
	readonly heading2: string
	readonly heading2AriaLabel: string
	readonly heading2Link?: string
	readonly startDate?: Date
	readonly endDate?: Date
	readonly location?: string
	readonly description?: string
	readonly summary: string
	readonly highlights: readonly string[]
} & ComponentProps<'dl'>) {
	return (
		<dl {...dlProps}>
			<DescriptionTerm
				description={description}
				endDate={endDate}
				heading1={heading1}
				heading1AriaLabel={heading1AriaLabel}
				heading2={heading2}
				heading2AriaLabel={heading2AriaLabel}
				heading2Link={heading2Link}
				location={location}
				startDate={startDate}
			/>
			<DescriptionDetailsSummary summary={summary} />
			<DescriptionDetailsHighlights highlights={highlights} />
			{children}
		</dl>
	)
}
