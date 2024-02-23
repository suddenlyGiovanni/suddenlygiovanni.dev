import { cn, T } from '@suddenly-giovanni/ui'
import { Option } from 'effect'
import { getDevIconComponent } from './dev-icons.tsx'

const skillsClasses = {
	ul: cn('mb-0 ml-0 flex list-none flex-row flex-wrap items-start justify-start gap-x-4 '),
	li: cn('mt-0 flex w-fit flex-row items-center gap-1'),
}

export function Skills(props: { skills: { name: string; keywords: string[] }[] }) {
	return (
		<section className="prose prose-slate dark:prose-invert">
			<T.h2>Skills</T.h2>

			{props.skills.map(({ name, keywords }) => (
				<Skill
					key={name}
					keywords={keywords}
					name={name}
				/>
			))}
		</section>
	)
}

function Skill({ name, keywords }: { name: string; keywords: string[] }) {
	return (
		<dl key={name}>
			<dt>{name}</dt>
			<dd>
				<T.ul className={skillsClasses.ul}>
					{keywords.map(keyword => {
						const maybeIcon = getDevIconComponent(keyword)
						return (
							<li
								className={skillsClasses.li}
								key={keyword}
							>
								{
									// if it does not match Concepts or Methodologies...
									Option.match(maybeIcon, {
										onNone: () => keyword,
										onSome: Icon => (
											<>
												<Icon className="size-4 fill-accent-foreground/80" />
												<span>{keyword}</span>
											</>
										),
									})
								}
							</li>
						)
					})}
				</T.ul>
			</dd>
		</dl>
	)
}
