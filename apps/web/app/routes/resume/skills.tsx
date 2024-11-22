import { Option } from 'effect'
import { type ReactElement, memo, useCallback, useMemo, useState } from 'react'

import type { Skill as ResumeSkill } from '@suddenlygiovanni/resume/schema-resume'
import { Icons } from '@suddenlygiovanni/ui/components/icons/icons.tsx'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import { clsx } from '@suddenlygiovanni/ui/lib/utils.ts'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	Trigger,
} from '@suddenlygiovanni/ui/ui/accordion.tsx'
import { Button } from '@suddenlygiovanni/ui/ui/button.tsx'

import { getDevIconComponent } from './dev-icons.tsx'

export const Skills = memo(function Skills({
	skills,
}: {
	readonly skills: readonly ResumeSkill[]
}): ReactElement {
	const all = useMemo(() => skills.map((_, idx) => `skill-${idx}`), [skills])

	const none = useMemo<string[]>(() => [], [])
	const initialState = useMemo(() => {
		const [head] = all
		return head ? [head] : none
	}, [all, none])
	const [value, setValue] = useState<string[]>(initialState)

	const toggleSkillsAccordion = useCallback(() => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}, [all, none])

	return (
		<section className="relative w-full">
			<T.h2>Skills</T.h2>

			<Button
				className="absolute top-0 right-0 rounded-full"
				onClick={toggleSkillsAccordion}
				size="icon"
				variant="ghost"
			>
				{value.length === 0 ? <Icons.rowSpacing /> : <Icons.cross2 />}
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
						value={
							// biome-ignore lint/style/noNonNullAssertion: FIXME: move away from non null assertions
							all.at(idx)!
						}
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
}: ResumeSkill & { readonly value: string }): ReactElement {
	return (
		<AccordionItem
			asChild={true}
			value={value}
		>
			<dl key={name}>
				<dt className="relative flex flex-row items-center justify-between">
					<span>{name}</span>
					<Trigger asChild={true}>
						<Button
							className={clsx('rounded-full', 'transition-all [&[data-state=open]>svg]:rotate-180')}
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
	readonly keywords: ResumeSkill['keywords']
}): ReactElement {
	return (
		<AccordionContent asChild={true}>
			<T.ul
				className={clsx(
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

const Keyword = memo(function Keyword({
	keyword,
}: {
	readonly keyword: ResumeSkill['keywords'][number]
}): ReactElement {
	const maybeIcon = getDevIconComponent(keyword)
	const classname = clsx('my-0 flex w-fit flex-row items-center justify-start gap-1 align-middle')

	return Option.match(maybeIcon, {
		onNone: (): ReactElement => (
			<li
				className={classname}
				key={keyword}
			>
				{keyword}
			</li>
		),
		onSome: (Icon): ReactElement => (
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
