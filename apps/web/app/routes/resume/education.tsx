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
import type { ReactElement } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { formatDateLocaleShort } from './format-date-locale-short.ts'
import { generateDjb2Hash } from './generate-djb2-hash.ts'
import type { EducationType } from '~/schemas/server.resume/education.ts'

export const Education = memo(function Education({
	educations,
}: {
	readonly educations: readonly EducationType[]
}): ReactElement {
	const all = useMemo(() => {
		return educations.map((_, idx) => `education-${idx}`)
	}, [educations])
	const none = useMemo<string[]>(() => [], [])
	const initialState = useMemo(() => {
		const [head] = all
		return head ? [head] : none
	}, [all, none])
	const [value, setValue] = useState<string[]>(initialState)

	const toggleEducation = useCallback(() => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}, [all, none])

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

			<Accordion className="w-full" onValueChange={setValue} type="multiple" value={value}>
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
})

const Edu = memo(function Edu({
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
	area: EducationType['area']
	courses: EducationType['courses']
	endDate: EducationType['endDate']
	startDate: EducationType['startDate']
	institution: EducationType['institution']
	studyType: EducationType['studyType']
	url: EducationType['url']
	location: EducationType['location']
	value: string
}): ReactElement {
	return (
		<AccordionItem asChild={true} value={value}>
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
						<ul aria-label="highlights" className="mb-0 ml-0 list-none">
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
})

const styles = {
	span: clsx('flex flex-row items-center text-sm font-normal  accent-muted'),
} as const

const EduHeader = memo(function EduHeader({
	area,
	institution,
	url,
	startDate,
	endDate,
	location,
	studyType,
}: {
	area: EducationType['area']
	endDate: EducationType['endDate']
	institution: EducationType['institution']
	location: EducationType['location']
	startDate: EducationType['startDate']
	studyType: EducationType['studyType']
	url: EducationType['url']
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
				aria-label="institution"
				className={clsx(styles.span, 'font-medium text-base not-italic')}
			>
				{institution}
				{url ? (
					<a className="ml-2" href={url} rel="noopener noreferrer" target="_blank">
						<Icons.link2 aria-label={`link to ${institution} institution`} className="size-4" />
					</a>
				) : null}
			</span>

			<span className={clsx(styles.span, 'justify-between')}>
				{startDate ? (
					<span aria-label="start date / end date">
						<time className="mr-2" dateTime={startDate}>
							{Either.getOrNull(formatDateLocaleShort(startDate))}
						</time>
						{endDate ? (
							<>
								-
								<time className="ml-2" dateTime={endDate}>
									{Either.getOrNull(formatDateLocaleShort(endDate))}
								</time>
							</>
						) : null}
					</span>
				) : null}

				{location ? (
					<span aria-label="location" className={styles.span}>
						{location}
					</span>
				) : null}
			</span>

			{studyType ? (
				<span aria-label="description" className={styles.span}>
					{studyType}
				</span>
			) : null}
			<Trigger asChild={true}>
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
					<span className="sr-only">Toggle {institution} accordion</span>
				</Button>
			</Trigger>
		</dt>
	)
})
