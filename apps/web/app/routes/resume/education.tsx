import { cn, Icons } from '@suddenly-giovanni/ui'
import { type Education } from './interface.ts'

function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

const styles = {
	span: cn('slate flex flex-row items-center text-sm font-normal text-muted'),
} as const

export function Education({ educations }: { readonly educations: readonly Education[] }) {
	return (
		<section>
			<h2 className="mb-4">Education</h2>
			<div className="flex flex-col gap-4">
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
					/>
				))}
			</div>
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
}: {
	area: Education['area']
	courses: Education['courses']
	endDate: Education['endDate']
	startDate: Education['startDate']
	institution: Education['institution']
	studyType: Education['studyType']
	url: Education['url']
	location: Education['location']
}) {
	return (
		<dl
			className={cn(
				'prose max-w-full',
				'border-b-2 border-dashed border-b-border/75',
				'pb-4',
			)}
		>
			<EduHeader
				area={area}
				endDate={endDate}
				institution={institution}
				location={location}
				startDate={startDate}
				studyType={studyType}
				url={url}
			/>

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
		</dl>
	)
}

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
}) {
	return (
		<dt className="flex w-full flex-col">
			<h3
				aria-label="area of education"
				className="mb-0 mt-0 text-base font-bold leading-none"
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
		</dt>
	)
}
