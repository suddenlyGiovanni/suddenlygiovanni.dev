import { cn, T } from '@suddenly-giovanni/ui'
import { Option } from 'effect'
import { type ReactElement, memo } from 'react'
import { getDevIconComponent } from './dev-icons.tsx'

export const Skills = memo(function Skills({
	skills,
}: {
	skills: { name: string; keywords: string[] }[]
}): ReactElement {
	return (
		<section>
			<T.h2>Skills</T.h2>

			{skills.map(({ name, keywords }) => (
				<Skill
					key={name}
					keywords={keywords}
					name={name}
				/>
			))}
		</section>
	)
})

const Skill = memo(function Skill({
	name,
	keywords,
}: {
	name: string
	keywords: string[]
}): ReactElement {
	return (
		<dl key={name}>
			<dt>{name}</dt>
			<dd>
				<KeywordsList keywords={keywords} />
			</dd>
		</dl>
	)
})

const KeywordsList = memo(function KeywordsList({
	keywords,
}: {
	keywords: string[]
}): ReactElement {
	return (
		<ul
			className={cn(
				'my-0 ml-0 flex list-none flex-row flex-wrap items-start justify-start gap-x-4',
			)}
		>
			{keywords.map(keyword => (
				<Keyword
					key={keyword}
					keyword={keyword}
				/>
			))}
		</ul>
	)
})

const Keyword = memo(function Keyword({ keyword }: { keyword: string }): ReactElement {
	const maybeIcon = getDevIconComponent(keyword)
	const classname = cn('my-0 flex w-fit flex-row items-center justify-start gap-1 align-middle')

	return Option.match(maybeIcon, {
		onNone: () => (
			<li
				className={classname}
				key={keyword}
			>
				{keyword}
			</li>
		),
		onSome: Icon => (
			<li
				className={classname}
				key={keyword}
			>
				<Icon className="size-4 fill-accent-foreground/80" />
				{keyword}
			</li>
		),
	})
})
