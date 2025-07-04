import { Icons } from '@repo/ui/components/icons/icons.tsx'
import { T } from '@repo/ui/components/typography/typography.tsx'
import { clsx } from '@repo/ui/lib/utils.ts'
import { Accordion, AccordionContent, AccordionItem, Trigger } from '@repo/ui/ui/accordion.tsx'
import { Button } from '@repo/ui/ui/button.tsx'
import type { Skill as ResumeSkill } from '@suddenly-giovanni/schema-resume'
import { Option } from 'effect'
import { type MouseEventHandler, type ReactElement, useState } from 'react'

import { getDevIconComponent } from './dev-icons.tsx'

export function Skills({ skills }: { readonly skills: readonly ResumeSkill[] }): ReactElement {
	const all = skills.map((_, idx) => `skill-${idx}`)
	const none: string[] = []
	const initialState: string[] = all[0] ? [all[0]] : none
	const [value, setValue] = useState<string[]>(initialState)

	const toggleSkillsAccordion: MouseEventHandler<HTMLButtonElement> = _ => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}

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
						// biome-ignore lint/style/noNonNullAssertion: it's ok
						value={all.at(idx)!}
					/>
				))}
			</Accordion>
		</section>
	)
}

function Skill({ name, keywords, value }: ResumeSkill & { readonly value: string }): ReactElement {
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
							className={clsx('rounded-full transition-all [&[data-state=open]>svg]:rotate-180')}
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
}

function KeywordsList({ keywords }: { readonly keywords: ResumeSkill['keywords'] }): ReactElement {
	return (
		<AccordionContent asChild={true}>
			<T.ul className={clsx('my-0 ml-0 flex list-none flex-row flex-wrap items-start justify-start gap-x-4')}>
				{keywords.map(keyword => (
					<Keyword
						key={keyword}
						keyword={keyword}
					/>
				))}
			</T.ul>
		</AccordionContent>
	)
}

function Keyword({ keyword }: { readonly keyword: ResumeSkill['keywords'][number] }): ReactElement {
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
}
