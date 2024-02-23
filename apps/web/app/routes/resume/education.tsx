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

const styles = {
	span: cn('slate flex flex-row items-center text-sm font-normal text-muted'),
} as const

export function Education({ educations }: Props) {
	return (
		<section>
			<h2>Education</h2>

			{educations.map(
				({ area, courses, endDate, startDate, institution, studyType, url, location }) => (
					<dl>
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
										<Icons.link2
											aria-label={`link to ${institution} institution`}
										/>
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

						<dd>
							<ul
								aria-label="highlights"
								className="mb-0 ml-0 list-none"
							>
								{courses.map((highlight, i) => (
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
				),
			)}
		</section>
	)
}
