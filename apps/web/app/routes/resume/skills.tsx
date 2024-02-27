import {
	Accordion,
	AccordionContent,
	AccordionItem,
	Button,
	cn,
	Icons,
	T,
	Trigger,
} from '@suddenly-giovanni/ui'
import { Option } from 'effect'
import { type ReactElement, memo, useMemo, useCallback, useState } from 'react'
import { getDevIconComponent } from './dev-icons.tsx'

export const Skills = memo(function Skills({
	skills,
}: {
	skills: { name: string; keywords: string[] }[]
}): ReactElement {
	const all = useMemo(() => {
		return skills.map((_, idx) => `skill-${idx}`)
	}, [skills])
	const none = useMemo(() => [], [])
	const [value, setValue] = useState<string[]>(none)

	const toggleSkillsAccordion = useCallback(() => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}, [all, none])

	return (
		<section className="relative w-full">
			<T.h2>Skills</T.h2>

			<Button
				className="absolute right-0 top-0 rounded-full"
				onClick={toggleSkillsAccordion}
				size="icon"
				variant="ghost"
			>
				{value.length === 0 ?
					<Icons.rowSpacing />
				:	<Icons.cross2 />}
				<span className="sr-only">Toggle skills accordion</span>
			</Button>

			<Accordion
				className="w-full"
				onValueChange={setValue}
				type="multiple"
				value={value}
			>
				{skills.map(({ name, keywords }, idx) => (
					<Skill
						key={name}
						keywords={keywords}
						name={name}
						value={all[idx]!}
					/>
				))}
			</Accordion>
		</section>
	)
})

const Skill = memo(function Skill({
	name,
	keywords,
	value,
}: {
	name: string
	keywords: string[]
	value: string
}): ReactElement {
	return (
		<AccordionItem
			asChild
			value={value}
		>
			<dl key={name}>
				<dt className="relative flex flex-row items-center justify-between">
					<span>{name}</span>
					<Trigger asChild>
						<Button
							className={cn(
								'rounded-full',
								'transition-all [&[data-state=open]>svg]:rotate-180',
							)}
							size="icon"
							type="button"
							variant="ghost"
						>
							<Icons.chevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
							<span className="sr-only">Toggle {name} accordion</span>
						</Button>
					</Trigger>
				</dt>
				<dd>
					<KeywordsList keywords={keywords} />
				</dd>
			</dl>
		</AccordionItem>
	)
})

const KeywordsList = memo(function KeywordsList({
	keywords,
}: {
	keywords: string[]
}): ReactElement {
	return (
		<AccordionContent asChild>
			<T.ul
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
			</T.ul>
		</AccordionContent>
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
