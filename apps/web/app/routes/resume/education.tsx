import {
	Accordion,
	AccordionContent,
	AccordionItem,
	cn,
	Icons,
	Trigger,
	T,
	Button,
} from '@suddenly-giovanni/ui'
import type { ReactElement } from 'react'
import { type Education } from './interface.ts'

function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

export function Education({
	educations,
}: {
	readonly educations: readonly Education[]
}): ReactElement {
	return (
		<section className="w-full">
			<T.h2 className="mb-0">Education</T.h2>
			<Accordion
				className="w-full"
				// collapsible
				type="multiple"
			>
				{educations.map((education, idx) => (
					<Edu
						area={education.area}
						courses={education.courses}
						endDate={education.endDate}
						idx={idx}
						institution={education.institution}
						key={`${idx.toString()} - ${education.institution} - ${education.area}`}
						location={education.location}
						startDate={education.startDate}
						studyType={education.studyType}
						url={education.url}
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
	idx,
}: {
	area: Education['area']
	courses: Education['courses']
	endDate: Education['endDate']
	startDate: Education['startDate']
	institution: Education['institution']
	studyType: Education['studyType']
	url: Education['url']
	location: Education['location']
	idx: number
}): ReactElement {
	return (
		<AccordionItem
			asChild
			value={`education-${idx}`}
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

				<AccordionContent asChild>
					<dd>
						<ul
							aria-label="highlights"
							className="mb-0 ml-0 list-none"
						>
							{courses?.map((highlight, i) => (
								<li
									className="pl-0"
									key={`${i}${highlight[0]}`}
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
	span: cn('flex flex-row items-center text-sm font-normal  accent-muted'),
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
	area: Education['area']
	endDate: Education['endDate']
	institution: Education['institution']
	location: Education['location']
	startDate: Education['startDate']
	studyType: Education['studyType']
	url: Education['url']
}): ReactElement {
	return (
		<dt className="relative my-4 flex w-full flex-col">
			<h3
				aria-label="area of education"
				className={cn('mb-0 mt-0 text-base font-bold leading-none')}
			>
				{area}
			</h3>

			<span
				aria-label="institution"
				className={cn(styles.span, 'text-base font-medium not-italic')}
			>
				{institution}
				{url ?
					<a
						className="mr-2"
						href={url}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icons.link2 aria-label={`link to ${institution} institution`} />
					</a>
				:	null}
			</span>

			<span className={cn(styles.span, 'justify-between')}>
				{!startDate ? null : (
					<span aria-label="start date / end date">
						<time
							className="mr-2"
							dateTime={startDate.toISOString()}
						>
							{formatDateLocaleShort(startDate)}
						</time>
						{endDate ?
							<>
								-
								<time
									className="ml-2"
									dateTime={endDate.toISOString()}
								>
									{formatDateLocaleShort(endDate)}
								</time>
							</>
						:	null}
					</span>
				)}

				{!location ? null : (
					<span
						aria-label="location"
						className={styles.span}
					>
						{location}
					</span>
				)}
			</span>

			{!studyType ? null : (
				<span
					aria-label="description"
					className={styles.span}
				>
					{studyType}
				</span>
			)}
			<Trigger asChild>
				<Button
					className={cn(
						'rounded-full',
						'transition-all [&[data-state=open]>svg]:rotate-180',
						'absolute right-0 top-0',
					)}
					size="icon"
					type="button"
					variant="ghost"
				>
					<Icons.chevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
				</Button>
			</Trigger>
		</dt>
	)
}
