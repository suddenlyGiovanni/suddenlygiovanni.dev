import { cn, T } from '@suddenly-giovanni/ui'
import { Option } from 'effect'
import type { ReactElement } from 'react'
import { getDevIconComponent } from './dev-icons.tsx'

export function Skills(props: { skills: { name: string; keywords: string[] }[] }): ReactElement {
	return (
		<section>
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

function Skill({ name, keywords }: { name: string; keywords: string[] }): ReactElement {
	return (
		<dl key={name}>
			<dt>{name}</dt>
			<dd>
				<ul
					className={cn(
						'my-0 ml-0 flex list-none flex-row flex-wrap items-start justify-start gap-x-4',
					)}
				>
					{keywords.map(keyword => {
						const maybeIcon = getDevIconComponent(keyword)
						return (
							<li
								className={cn(
									'my-0 flex w-fit flex-row items-center justify-start gap-1 align-middle',
								)}
								key={keyword}
							>
								{
									// if it does not match Concepts or Methodologies...
									Option.match(maybeIcon, {
										onNone: () => keyword,
										onSome: Icon => (
											<>
												<Icon className="size-4 fill-accent-foreground/80" />
												{keyword}
											</>
										),
									})
								}
							</li>
						)
					})}
				</ul>
			</dd>
		</dl>
	)
}
