import { Icons } from '@suddenly-giovanni/ui/components/icons/icons.tsx'
import { T } from '@suddenly-giovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenly-giovanni/ui/lib/utils.ts'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	Trigger,
} from '@suddenly-giovanni/ui/ui/accordion.tsx'
import { Button } from '@suddenly-giovanni/ui/ui/button.tsx'
import { type ReactElement, memo, useCallback, useMemo, useState } from 'react'

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

export const Experiences = memo(function Experiences({
	works,
}: {
	readonly works: readonly Work[]
}): ReactElement {
	const all = useMemo(() => {
		return works.map((_, idx) => `experience-${idx}`)
	}, [works])
	const none = useMemo<string[]>(() => [], [])
	const initialState = useMemo(() => {
		const [head] = all
		return head ? [head] : none
	}, [all, none])
	const [value, setValue] = useState<string[]>(initialState)

	const toggleExperiences = useCallback(() => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}, [all, none])

	return (
		<section className="relative w-full">
			<T.h2 className="mb-0">Experience</T.h2>
			<Button
				className="absolute top-0 right-0 rounded-full"
				onClick={toggleExperiences}
				size="icon"
				variant="ghost"
			>
				{value.length === 0 ? <Icons.rowSpacing /> : <Icons.cross2 />}
				<span className="sr-only">Toggle experiences accordion</span>
			</Button>

			<Accordion className="w-full" onValueChange={setValue} type="multiple" value={value}>
				{works.map((work, idx) => (
					<Experience
						contact={work.contact}
						description={work.description}
						endDate={work.endDate}
						highlights={work.highlights}
						key={`${idx.toString()} - ${String(work.name)} - ${String(work.position)}`}
						location={work.location}
						name={work.name}
						position={work.position}
						startDate={work.startDate}
						summary={work.summary}
						url={work.url}
						value={all[idx]!}
					/>
				))}
			</Accordion>
		</section>
	)
})

const Experience = memo(function Experience({
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
	value,
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
	value: string
}): ReactElement {
	return (
		<AccordionItem asChild value={value}>
			<dl>
				<ExperienceHeader
					description={description}
					endDate={endDate}
					location={location}
					name={name}
					position={position}
					startDate={startDate}
					url={url}
				/>
				<AccordionContent>
					<ExperienceSummary summary={summary} />
					<ExperienceHighlights highlights={highlights} />
					<ExperienceContact contact={contact} />
				</AccordionContent>
			</dl>
		</AccordionItem>
	)
})

const styles = {
	span: clsx('flex flex-row items-center text-sm font-normal italic accent-muted'),
} as const

const ExperienceHeader = memo(function ExperienceHeader({
	description,
	endDate,
	location,
	name,
	position,
	startDate,
	url,
}: {
	position: string | undefined
	name: string | undefined
	url: string | undefined
	startDate: Date | undefined
	endDate: Date | undefined
	location: string | undefined
	description: string | undefined
}): ReactElement {
	return (
		<dt className="relative my-4 flex w-full flex-col">
			<h3 aria-label="job title" className={clsx('mt-0 mb-0 font-bold text-base leading-none')}>
				{position}
			</h3>

			<span aria-label="company" className={clsx(styles.span, 'font-medium text-base not-italic')}>
				{name}
				{!url ? null : (
					<a className="ml-2" href={url} rel="noopener noreferrer" target="_blank">
						<Icons.link2 aria-label={`link to ${name} company`} className="size-4" />
					</a>
				)}
			</span>

			<span className={clsx(styles.span, 'justify-between')}>
				{!startDate ? null : (
					<span aria-label="start date / end date">
						<time className="mr-1" dateTime={startDate.toISOString()}>
							{formatDateLocaleShort(startDate)}
						</time>
						{!endDate ? null : (
							<>
								-
								<time className="ml-1" dateTime={endDate.toISOString()}>
									{formatDateLocaleShort(endDate)}
								</time>
							</>
						)}
					</span>
				)}

				{!location ? null : <span aria-label="location">{location}</span>}
			</span>

			{!description ? null : (
				<span aria-label="description" className={styles.span}>
					{description}
				</span>
			)}
			<Trigger asChild>
				<Button
					className={clsx(
						'rounded-full',
						'transition-all [&[data-state=open]>svg]:rotate-180',
						'absolute top-0 right-0',
					)}
					size="icon"
					type="button"
					variant="ghost"
				>
					<Icons.chevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
					<span className="sr-only">Toggle {name} accordion</span>
				</Button>
			</Trigger>
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

function ExperienceHighlights({
	highlights,
}: {
	highlights: string[] | undefined
}): ReactElement | null {
	if (!highlights) return null
	return (
		<dd>
			<T.ul aria-label="highlights" className={clsx('mb-0 ml-0 list-none')}>
				{highlights.map((highlight, i) => (
					<li className="pl-0" key={`${i}${highlight[0]}`}>
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
				<address className={clsx('flex flex-row flex-wrap items-baseline justify-between')}>
					<span>{name}</span>
					{!email ? null : <a href={`mailto:${email}`}>{email}</a>}
					{!phone ? null : <a href={`tel:${phone}`}>{phone}</a>}
				</address>
			</dd>
		</>
	)
}
