/** biome-ignore-all lint/style/noNonNullAssertion: it is ok here */
import { Icons } from '@repo/ui/components/icons/icons.tsx'
import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import { AccordionContent, AccordionItem, Trigger } from '@repo/ui/ui/accordion.tsx'
import { Badge } from '@repo/ui/ui/badge.tsx'
import { Button } from '@repo/ui/ui/button.tsx'
import { Card } from '@repo/ui/ui/card.tsx'
import type * as Model from '@suddenly-giovanni/schema-resume'
import { Either, Option } from 'effect'
import type { ReactElement } from 'react'

import { getDevIconComponent } from '#root/src/routes/resume/dev-icons.tsx'
import { formatDateLocaleShort } from '#root/src/routes/resume/format-date-locale-short.ts'

export function Experience(
	work: Pick<Model.Work, 'contact' | 'description' | 'location' | 'name' | 'summary' | 'url' | 'roles'> & {
		value: string
	},
): ReactElement {
	return (
		<AccordionItem
			asChild={true}
			value={work.value}
		>
			<article aria-label={`experience as ${work.roles[0].title} at ${work.name}`}>
				<ExperienceHeader
					description={work.description}
					location={work.location}
					name={work.name}
					roles={work.roles}
					url={work.url}
				/>
				<AccordionContent>
					<ExperienceSummary summary={work.summary} />
					<Roles roles={work.roles} />
					<ExperienceContact contact={work.contact} />
				</AccordionContent>
			</article>
		</AccordionItem>
	)
}

const styles = {
	span: clsx('flex flex-row items-center font-normal text-sm italic accent-muted'),
} as const

function getDates(roles: Model.Work['roles']): {
	readonly startDate: string
	readonly endDate: string
} {
	const dates = roles
		.flatMap(role => [role.startDate, role.endDate].filter(Boolean))
		.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

	return {
		endDate: dates.at(-1)!,

		startDate: dates.at(0)!,
	}
}

function ExperienceHeader(work: {
	readonly name: Model.Work['name']
	readonly url: undefined | Model.Work['url']
	readonly description: Model.Work['description']
	readonly location: undefined | Model.Work['location']
	readonly roles: Model.Work['roles']
}): ReactElement {
	const { startDate, endDate } = getDates(work.roles)

	const firstRole = work.roles.at(0)!

	return (
		<div className="relative my-4 flex w-full flex-col">
			<hgroup className="space-y-1">
				<h2
					aria-label="job title"
					className={clsx('mt-0 mb-0 font-bold text-base leading-none')}
				>
					{firstRole.title}
				</h2>

				<h3
					aria-label="company"
					className={clsx('mt-0 mb-0 flex flex-row items-center font-medium text-base accent-muted')}
				>
					{work.name}
					{work.url ? (
						<a
							className="ml-2"
							href={work.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Icons.link2
								aria-label={`link to ${work.name} company`}
								className="size-4"
							/>
						</a>
					) : null}
				</h3>
			</hgroup>

			<span className={clsx(styles.span, 'justify-between')}>
				<span
				// aria-label="start date / end date"
				>
					<time
						className="mr-1"
						dateTime={startDate}
					>
						{Either.getOrNull(formatDateLocaleShort(startDate))}
					</time>
					{endDate ? (
						<>
							-
							<time
								className="ml-1"
								dateTime={endDate}
							>
								{Either.getOrNull(formatDateLocaleShort(endDate))}
							</time>
						</>
					) : null}
				</span>

				{work.location ? (
					<span
					// aria-label="location"
					>
						{work.location}
					</span>
				) : null}
			</span>

			{work.description ? (
				<span
					// aria-label="description"
					className={styles.span}
				>
					{work.description}
				</span>
			) : null}
			<Trigger asChild={true}>
				<Button
					className={clsx('absolute top-0 right-0 rounded-full transition-all [&[data-state=open]>svg]:rotate-180')}
					size="icon"
					type="button"
					variant="ghost"
				>
					<Icons.chevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
					<span className="sr-only">Toggle {work.name} accordion</span>
				</Button>
			</Trigger>
		</div>
	)
}

function ExperienceSummary({ summary }: { readonly summary: Model.Work['summary'] }): null | ReactElement {
	return summary ? (
		<div className="mb-4">
			{summary.split('\n').map(p => (
				<T.blockquote
					className="my-0 text-muted-foreground text-sm"
					key={p}
				>
					{p}
				</T.blockquote>
			))}
		</div>
	) : null
}

function Roles({ roles }: { readonly roles: Model.Work['roles'] }): ReactElement {
	return (
		<ul className="mt-0 flex list-none flex-col gap-2 pl-0 sm:pl-3 md:pl-6">
			{roles.map(role => (
				<li key={role.startDate}>
					<Role
						{...(roles.length > 1 ? { endDate: role.endDate, startDate: role.startDate, title: role.title } : {})}
						highlights={role.highlights}
						responsibilities={role.responsibilities}
						technologies={role.technologies}
					/>
				</li>
			))}
		</ul>
	)
}

function Role(
	role:
		| {
				readonly responsibilities: Model.Role['responsibilities']
				readonly highlights: undefined | Model.Role['highlights']
				readonly technologies: undefined | Model.Role['technologies']
		  }
		| {
				readonly title: Model.Role['title']
				readonly startDate: Model.Role['startDate']
				readonly endDate: undefined | Model.Role['endDate']
				readonly responsibilities: Model.Role['responsibilities']
				readonly highlights: undefined | Model.Role['highlights']
				readonly technologies: undefined | Model.Role['technologies']
		  },
): ReactElement {
	return (
		<Card.Root
			asChild={true}
			className="ml-0 p-6"
		>
			<article>
				{'title' in role && (
					<Card.Header className="px-0 pt-0">
						<Card.Title
							aria-label="job title"
							className={clsx('mt-0 mb-0 font-bold text-base leading-none')}
						>
							{role.title}
						</Card.Title>
						{'startDate' in role && (
							<Card.Description>
								<span
								// aria-label="start date / end date"
								>
									<time
										className="mr-1"
										dateTime={role.startDate}
									>
										{Either.getOrNull(formatDateLocaleShort(role.startDate))}
									</time>
									{role.endDate ? (
										<>
											-
											<time
												className="ml-1"
												dateTime={role.endDate}
											>
												{Either.getOrNull(formatDateLocaleShort(role.endDate))}
											</time>
										</>
									) : null}
								</span>
							</Card.Description>
						)}
					</Card.Header>
				)}

				<Card.Content className="p-0">
					<dl className="my-0 flex flex-col gap-3">
						<div>
							<dt className="mt-0">Responsibilities</dt>

							{role.responsibilities.map(resp => (
								<dd
									className="text-gray-600 dark:text-gray-400"
									// role="listitem"
									key={resp}
								>
									{resp.split('\n').map(resP => (
										<p
											className="my-0"
											key={resp}
										>
											{resP}
										</p>
									))}
								</dd>
							))}
						</div>

						{role.highlights && (
							<div>
								<dt className="mt-0">Highlights</dt>
								{role.highlights.map(highlight => (
									<dd
										className="text-gray-600 dark:text-gray-400"
										// role="listitem"
										key={highlight}
									>
										{highlight.split('\n').map(hP => (
											<p
												className="my-0"
												key={hP}
											>
												{hP}
											</p>
										))}
									</dd>
								))}
							</div>
						)}

						{role.technologies && (
							<div className="flex-col items-start p-0">
								<dt className="mb-2">Technologies</dt>
								<dd className="flex flex-wrap gap-2">
									{role.technologies.map(tech => (
										<Tech
											key={tech}
											tech={tech}
										/>
									))}
								</dd>
							</div>
						)}
					</dl>
				</Card.Content>
			</article>
		</Card.Root>
	)
}

function ExperienceContact({ contact }: { readonly contact: Model.Work['contact'] }): null | ReactElement {
	return contact ? (
		<>
			<dt>Contacts:</dt>
			<dd>
				<address className={clsx('flex flex-row flex-wrap items-baseline justify-between')}>
					<span>{contact.name}</span>
					<a href={`mailto:${contact.email}`}>{contact.email}</a>
					{contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : null}
				</address>
			</dd>
		</>
	) : null
}

function Tech({ tech }: { readonly tech: string }): ReactElement {
	const maybeIcon = getDevIconComponent(tech)
	const classname = clsx('my-0 flex w-fit select-none flex-row items-center justify-start gap-1 align-middle')

	return maybeIcon.pipe(
		Option.match({
			onNone: (): ReactElement => (
				<Badge
					className={classname}
					key={tech}
					variant="outline"
				>
					<span>{tech}</span>
				</Badge>
			),
			onSome: (Icon): ReactElement => (
				<Badge
					className={classname}
					key={tech}
					variant="outline"
				>
					<Icon className="size-4 fill-accent-foreground/80" />
					<span>{tech}</span>
				</Badge>
			),
		}),
	)
}
