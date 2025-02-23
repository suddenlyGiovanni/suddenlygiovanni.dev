import { Either, pipe } from 'effect'
import { type MouseEventHandler, type ReactElement, useState } from 'react'

import { Icons } from '@repo/ui/components/icons/icons.tsx'
import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import { Accordion, AccordionContent, AccordionItem, Trigger } from '@repo/ui/ui/accordion.tsx'
import { Button } from '@repo/ui/ui/button.tsx'
import type * as Model from '@suddenly-giovanni/schema-resume'

import { formatDateLocaleShort } from './format-date-locale-short.ts'
import { generateDjb2Hash } from './generate-djb2-hash.ts'

export function Education({
	educations,
}: {
	readonly educations: readonly Model.Education[]
}): ReactElement {
	const all: string[] = educations.map((_, idx) => `education-${idx}`)
	const none: string[] = []
	const initialState: string[] = all[0] ? [all[0]] : none

	const [value, setValue] = useState<string[]>(initialState)

	const toggleEducation: MouseEventHandler<HTMLButtonElement> = _ => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}

	return (
		<section className="relative w-full">
			<T.h2 className="mb-0">Education</T.h2>

			<Button
				className="absolute top-0 right-0 rounded-full"
				onClick={toggleEducation}
				size="icon"
				variant="ghost"
			>
				{value.length === 0 ? <Icons.rowSpacing /> : <Icons.cross2 />}
				<span className="sr-only">Toggle education accordion</span>
			</Button>

			<Accordion
				className="w-full"
				onValueChange={setValue}
				type="multiple"
				value={value}
			>
				{educations.map((education, idx) => (
					<Edu
						area={education.area}
						courses={education.courses}
						endDate={education.endDate}
						institution={education.institution}
						key={`${idx.toString()} - ${education.institution} - ${education.area}`}
						location={education.location}
						startDate={education.startDate}
						studyType={education.studyType}
						url={education.url}
						value={
							// biome-ignore lint/style/noNonNullAssertion: FIXME: move away from non-null assertion
							all.at(idx)!
						}
					/>
				))}
			</Accordion>
		</section>
	)
}

function Edu({
	area,
	courses,
	endDate,
	startDate,
	institution,
	studyType,
	url,
	location,
	value,
}: {
	area: Model.Education['area']
	courses: Model.Education['courses']
	endDate: Model.Education['endDate']
	startDate: Model.Education['startDate']
	institution: Model.Education['institution']
	studyType: Model.Education['studyType']
	url: Model.Education['url']
	location: Model.Education['location']
	value: string
}): ReactElement {
	return (
		<AccordionItem
			asChild={true}
			value={value}
		>
			<dl>
				<EduHeader
					area={area}
					endDate={endDate}
					institution={institution}
					location={location}
					startDate={startDate}
					studyType={studyType}
					url={url}
				/>

				<AccordionContent asChild={true}>
					<dd>
						<ul
							aria-label="highlights"
							className="mb-0 ml-0 list-none"
						>
							{courses?.map(highlight => (
								<li
									className="pl-0"
									key={pipe(highlight, s => s.slice(0, s.length / 2), generateDjb2Hash)}
								>
									{highlight}
								</li>
							))}
						</ul>
					</dd>
				</AccordionContent>
			</dl>
		</AccordionItem>
	)
}

const styles = {
	span: clsx('flex flex-row items-center font-normal text-sm accent-muted'),
} as const

function EduHeader({
	area,
	institution,
	url,
	startDate,
	endDate,
	location,
	studyType,
}: {
	area: Model.Education['area']
	endDate: Model.Education['endDate']
	institution: Model.Education['institution']
	location: Model.Education['location']
	startDate: Model.Education['startDate']
	studyType: Model.Education['studyType']
	url: Model.Education['url']
}): ReactElement {
	return (
		<dt className="relative my-4 flex w-full flex-col">
			<h3
				aria-label="area of education"
				className={clsx('mt-0 mb-0 font-bold text-base leading-none')}
			>
				{area}
			</h3>

			<span
				// aria-label="institution"
				className={clsx(styles.span, 'font-medium text-base not-italic')}
			>
				{institution}
				{url ? (
					<a
						className="ml-2"
						href={url}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icons.link2
							aria-label={`link to ${institution} institution`}
							className="size-4"
						/>
					</a>
				) : null}
			</span>

			<span className={clsx(styles.span, 'justify-between')}>
				{startDate ? (
					<span
					// aria-label="start date / end date"
					>
						<time
							className="mr-2"
							dateTime={startDate}
						>
							{Either.getOrNull(formatDateLocaleShort(startDate))}
						</time>
						{endDate ? (
							<>
								-
								<time
									className="ml-2"
									dateTime={endDate}
								>
									{Either.getOrNull(formatDateLocaleShort(endDate))}
								</time>
							</>
						) : null}
					</span>
				) : null}

				{location ? (
					<span
						// aria-label="location"
						className={styles.span}
					>
						{location}
					</span>
				) : null}
			</span>

			{studyType ? (
				<span
					// aria-label="description"
					className={styles.span}
				>
					{studyType}
				</span>
			) : null}
			<Trigger asChild={true}>
				<Button
					className={clsx(
						'absolute top-0 right-0 rounded-full transition-all [&[data-state=open]>svg]:rotate-180',
					)}
					size="icon"
					type="button"
					variant="ghost"
				>
					<Icons.chevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
					<span className="sr-only">Toggle {institution} accordion</span>
				</Button>
			</Trigger>
		</dt>
	)
}
