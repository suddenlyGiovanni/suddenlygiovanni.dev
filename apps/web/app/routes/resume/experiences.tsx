import {
	cn,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icons,
	Separator,
	T,
	Button,
	useToggle,
} from '@suddenly-giovanni/ui'
import { type ReactElement, useEffect, memo } from 'react'

function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

interface Work {
	/**
	 * e.g. Social Media Company
	 */
	description?: string
	endDate?: Date
	/**
	 * Specify multiple accomplishments
	 */
	highlights?: string[]
	/**
	 * e.g. Menlo Park, CA
	 */
	location?: string
	/**
	 * e.g. Facebook
	 */
	name?: string
	/**
	 * e.g. Software Engineer
	 */
	position?: string
	startDate?: Date
	/**
	 * Give an overview of your responsibilities at the company
	 */
	summary?: string
	/**
	 * e.g. http://facebook.example.com
	 */
	url?: string

	contact?: {
		/**
		 * ideally name and role
		 * eg. Mark Zuckerberg (CTO)
		 */
		name: string
		email?: string
		/**
		 * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
		 */
		phone?: string
	}
}

export function Experiences({ works }: { readonly works: readonly Work[] }): ReactElement {
	const [isCollapsed, toggleAllExperience] = useToggle(true)
	return (
		<section className="relative w-full">
			<T.h2 className="mb-0">Experience</T.h2>
			<Button
				className="absolute right-0 top-0 rounded-full"
				onClick={toggleAllExperience}
				size="icon"
				variant="ghost"
			>
				{isCollapsed ?
					<Icons.rowSpacing />
				:	<Icons.cross2 />}
				<span className="sr-only">Toggle</span>
			</Button>

			<div className="flex flex-col gap-4">
				{works.map((work, idx) => (
					<>
						<Experience
							contact={work.contact}
							description={work.description}
							endDate={work.endDate}
							highlights={work.highlights}
							key={`${idx.toString()} - ${String(work.name)} - ${String(work.position)}`}
							location={work.location}
							name={work.name}
							position={work.position}
							shouldBeCollapsed={isCollapsed}
							startDate={work.startDate}
							summary={work.summary}
							url={work.url}
						/>
						<Separator key={`${idx.toString()} - ${String(work.name)} - divider`} />
					</>
				))}
			</div>
		</section>
	)
}

const styles = {
	span: cn('flex flex-row items-center text-sm font-normal italic accent-muted'),
} as const

const ExperienceHeader = memo(function ExperienceHeader({
	description,
	endDate,
	location,
	name,
	position,
	startDate,
	url,
	isCollapsed,
}: {
	position: string | undefined
	name: string | undefined
	url: string | undefined
	startDate: Date | undefined
	endDate: Date | undefined
	location: string | undefined
	description: string | undefined
	isCollapsed: boolean
}): ReactElement {
	return (
		<dt className="relative mt-0 flex w-full flex-col">
			<h3
				aria-label="job title"
				className={cn('mb-0 mt-0 text-base font-bold leading-none')}
			>
				{position}
			</h3>

			<span
				aria-label="company"
				className={cn(styles.span, 'text-base font-medium not-italic')}
			>
				{name}
				{!url ? null : (
					<a
						className="ml-1"
						href={url}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icons.link2
							aria-label={`link to ${name} company`}
							className="size-4"
						/>
					</a>
				)}
			</span>

			<span className={cn(styles.span, 'justify-between')}>
				{!startDate ? null : (
					<span aria-label="start date / end date">
						<time
							className="mr-1"
							dateTime={startDate.toISOString()}
						>
							{formatDateLocaleShort(startDate)}
						</time>
						{!endDate ? null : (
							<>
								-
								<time
									className="ml-1"
									dateTime={endDate.toISOString()}
								>
									{formatDateLocaleShort(endDate)}
								</time>
							</>
						)}
					</span>
				)}

				{!location ? null : <span aria-label="location">{location}</span>}
			</span>

			{!description ? null : (
				<span
					aria-label="description"
					className={styles.span}
				>
					{description}
				</span>
			)}
			<CollapsibleTrigger asChild>
				<Button
					className="absolute right-0 top-0 rounded-full"
					size="icon"
					variant="ghost"
				>
					{isCollapsed ?
						<Icons.rowSpacing />
					:	<Icons.cross2 />}
					<span className="sr-only">Toggle</span>
				</Button>
			</CollapsibleTrigger>
		</dt>
	)
})

function ExperienceSummary(props: { summary: string | undefined }): ReactElement {
	return (
		<dd>
			<T.muted>{props.summary}</T.muted>
		</dd>
	)
}

function ExperienceHighlights(props: { highlights: string[] | undefined }): ReactElement | null {
	if (!props.highlights) return null
	return (
		<dd>
			<T.ul
				aria-label="highlights"
				className={cn('mb-0 ml-0 list-none')}
			>
				{props.highlights.map((highlight, i) => (
					<li
						className="pl-0"
						key={`${i}${highlight[0]}`}
					>
						{highlight}
					</li>
				))}
			</T.ul>
		</dd>
	)
}

function ExperienceContact({
	contact,
}: {
	contact: { name: string; email?: string; phone?: string } | undefined
}): ReactElement | null {
	if (!contact) return null
	const { name, email, phone } = contact
	return (
		<>
			<dt>Contacts:</dt>
			<dd>
				<address className={cn('flex flex-row flex-wrap items-baseline justify-between')}>
					<span>{name}</span>
					{!email ? null : <a href={`mailto:${email}`}>{email}</a>}
					{!phone ? null : <a href={`tel:${phone}`}>{phone}</a>}
				</address>
			</dd>
		</>
	)
}

function Experience({
	contact,
	description,
	endDate,
	highlights,
	location,
	name,
	position,
	startDate,
	summary,
	url,
	shouldBeCollapsed,
}: {
	readonly contact: Work['contact']
	readonly description: Work['description']
	readonly endDate: Work['endDate']
	readonly highlights: Work['highlights']
	readonly location: Work['location']
	readonly name: Work['name']
	readonly position: Work['position']
	readonly startDate: Work['startDate']
	readonly summary: Work['summary']
	readonly url: Work['url']
	readonly shouldBeCollapsed: boolean
}): ReactElement {
	const [isCollapsed, toggleCollapse, setCollapsed] = useToggle(shouldBeCollapsed)

	useEffect(() => {
		setCollapsed(shouldBeCollapsed)
	}, [shouldBeCollapsed, setCollapsed])

	return (
		<Collapsible
			asChild
			onOpenChange={toggleCollapse}
			open={!isCollapsed}
		>
			<dl className="w-full">
				<ExperienceHeader
					description={description}
					endDate={endDate}
					isCollapsed={isCollapsed}
					location={location}
					name={name}
					position={position}
					startDate={startDate}
					url={url}
				/>
				<CollapsibleContent>
					<ExperienceSummary summary={summary} />
					<ExperienceHighlights highlights={highlights} />
					<ExperienceContact contact={contact} />
				</CollapsibleContent>
			</dl>
		</Collapsible>
	)
}
