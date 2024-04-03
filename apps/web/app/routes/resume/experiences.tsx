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
import * as Either from 'effect/Either'
import { pipe } from 'effect/Function'
import { type ReactElement, memo, useCallback, useMemo, useState } from 'react'
import { formatDateLocaleShort } from './format-date-locale-short.ts'
import { generateDjb2Hash } from './generate-djb2-hash.ts'
import type { ResumeType } from '~/schemas/server.resume/resume.ts'
import type { WorkType } from '~/schemas/server.resume/work.ts'

export const Experiences = memo(function Experiences({
	work,
}: {
	readonly work: ResumeType['work']
}): ReactElement {
	const all = useMemo(() => {
		return work.map((_, idx) => `experience-${idx}`)
	}, [work])
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
				{work.map(
					(
						{
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
						},
						idx,
					) => (
						<Experience
							contact={contact}
							description={description}
							endDate={endDate}
							highlights={highlights}
							key={`${idx.toString()} - ${String(name)} - ${String(position)}`}
							location={location}
							name={name}
							position={position}
							startDate={startDate}
							summary={summary}
							url={url}
							value={
								// biome-ignore lint/style/noNonNullAssertion: FIXME: move away from non-null assertion
								all.at(idx)!
							}
						/>
					),
				)}
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
	readonly contact: WorkType['contact']
	readonly description: WorkType['description']
	readonly endDate: WorkType['endDate']
	readonly highlights: WorkType['highlights']
	readonly location: WorkType['location']
	readonly name: WorkType['name']
	readonly position: WorkType['position']
	readonly startDate: WorkType['startDate']
	readonly summary: WorkType['summary']
	readonly url: WorkType['url']
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
	readonly position: WorkType['position']
	readonly name: WorkType['name']
	readonly url: WorkType['url']
	readonly startDate: WorkType['startDate']
	readonly endDate: WorkType['endDate']
	readonly location: WorkType['location']
	readonly description: WorkType['description']
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
				<span aria-label="start date / end date">
					<time className="mr-1" dateTime={startDate}>
						{Either.getOrNull(formatDateLocaleShort(startDate))}
					</time>
					{!endDate ? null : (
						<>
							-
							<time className="ml-1" dateTime={endDate}>
								{Either.getOrNull(formatDateLocaleShort(endDate))}
							</time>
						</>
					)}
				</span>

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

function ExperienceSummary({
	summary,
}: {
	readonly summary: WorkType['summary']
}): null | ReactElement {
	return !summary ? null : (
		<dd>
			<T.muted>{summary}</T.muted>
		</dd>
	)
}

function ExperienceHighlights({
	highlights,
}: {
	readonly highlights: WorkType['highlights']
}): ReactElement {
	return (
		<dd>
			<T.ul aria-label="highlights" className={clsx('mb-0 ml-0 list-none')}>
				{highlights.map(highlight => (
					<li
						className="pl-0"
						key={pipe(highlight, s => s.slice(0, highlight.length / 2), generateDjb2Hash)}
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
	readonly contact: WorkType['contact']
}): null | ReactElement {
	if (!contact) return null
	const { name, email, phone } = contact
	return (
		<>
			<dt>Contacts:</dt>
			<dd>
				<address className={clsx('flex flex-row flex-wrap items-baseline justify-between')}>
					<span>{name}</span>
					<a href={`mailto:${email}`}>{email}</a>
					{!phone ? null : <a href={`tel:${phone}`}>{phone}</a>}
				</address>
			</dd>
		</>
	)
}
