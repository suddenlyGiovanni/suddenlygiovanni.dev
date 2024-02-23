import { cn, Icons } from '@suddenly-giovanni/ui'
import { type Education } from './interface.ts'

function formatDateLocaleShort(date: Date): string {
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

interface Props {
	readonly educations: readonly Education[]
}

export function Education({ educations }: Props) {
	return (
		<section>
			<h2>Education</h2>

			{educations.map(
				({ area, courses, endDate, startDate, institution, studyType, url, location }) => (
					<SectionItem
						description={studyType}
						endDate={endDate}
						heading1={area || ''}
						heading1AriaLabel="area of education"
						heading2={institution || ''}
						heading2AriaLabel="institution"
						heading2Link={url}
						highlights={courses || []}
						key={institution}
						location={location}
						startDate={startDate}
						summary=""
					/>
				),
			)}
		</section>
	)
}

interface Props {
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
}

export const SectionItem: React.FC<Props & React.ComponentProps<'dl'>> = ({
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
}) => (
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

		<dd>{summary}</dd>

		<dd>
			<ul
				aria-label="highlights"
				className="mb-0 ml-0 list-none"
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

		{children}
	</dl>
)

const styles = {
	span: cn('slate flex flex-row items-center text-sm font-normal text-muted'),
} as const

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
				className="mb-0 mt-0 text-base font-bold leading-none"
			>
				{heading1}
			</h3>

			<span
				aria-label={heading2AriaLabel}
				className={cn(styles.span, 'text-base font-medium not-italic')}
			>
				{heading2}
				{heading2Link ?
					<a
						className="mr-2"
						href={heading2Link}
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icons.link2 aria-label={`link to ${heading2} ${heading2AriaLabel}`} />
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

			{!description ? null : (
				<span
					aria-label="description"
					className={styles.span}
				>
					{description}
				</span>
			)}
		</dt>
	)
}
