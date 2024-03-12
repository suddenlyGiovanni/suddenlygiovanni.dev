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
import type { ReactElement } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'

import { Education as IEducation } from '~/routes/resume/interfaces/education.ts'

function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

export const Education = memo(function Education({
	educations,
}: {
	readonly educations: readonly IEducation[]
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
				className="absolute right-0 top-0 rounded-full"
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
						value={all[idx]!}
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
	area: IEducation['area']
	courses: IEducation['courses']
	endDate: IEducation['endDate']
	startDate: IEducation['startDate']
	institution: IEducation['institution']
	studyType: IEducation['studyType']
	url: IEducation['url']
	location: IEducation['location']
	value: string
}): ReactElement {
	return (
		<AccordionItem asChild value={value}>
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

				<AccordionContent asChild>
					<dd>
						<ul aria-label="highlights" className="mb-0 ml-0 list-none">
							{courses?.map((highlight, i) => (
								<li className="pl-0" key={`${i}${highlight[0]}`}>
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
	area: IEducation['area']
	endDate: IEducation['endDate']
	institution: IEducation['institution']
	location: IEducation['location']
	startDate: IEducation['startDate']
	studyType: IEducation['studyType']
	url: IEducation['url']
}): ReactElement {
	return (
		<dt className="relative my-4 flex w-full flex-col">
			<h3
				aria-label="area of education"
				className={clsx('mb-0 mt-0 text-base font-bold leading-none')}
			>
				{area}
			</h3>

			<span
				aria-label="institution"
				className={clsx(styles.span, 'text-base font-medium not-italic')}
			>
				{institution}
				{url
					? <a className="ml-2" href={url} rel="noopener noreferrer" target="_blank">
							<Icons.link2 aria-label={`link to ${institution} institution`} className="size-4" />
					  </a>
					: null}
			</span>

			<span className={clsx(styles.span, 'justify-between')}>
				{!startDate
					? null
					: <span aria-label="start date / end date">
							<time className="mr-2" dateTime={startDate.toISOString()}>
								{formatDateLocaleShort(startDate)}
							</time>
							{endDate
								? <>
										-
										<time className="ml-2" dateTime={endDate.toISOString()}>
											{formatDateLocaleShort(endDate)}
										</time>
								  </>
								: null}
					  </span>}

				{!location
					? null
					: <span aria-label="location" className={styles.span}>
							{location}
					  </span>}
			</span>

			{!studyType
				? null
				: <span aria-label="description" className={styles.span}>
						{studyType}
				  </span>}
			<Trigger asChild>
				<Button
					className={clsx(
						'rounded-full',
						'transition-all [&[data-state=open]>svg]:rotate-180',
						'absolute right-0 top-0',
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
