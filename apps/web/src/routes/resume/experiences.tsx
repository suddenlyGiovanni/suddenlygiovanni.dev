import { type MouseEventHandler, type ReactElement, useState } from 'react'

import type * as Model from '@suddenlygiovanni/resume/schema-resume'
import { Icons } from '@suddenlygiovanni/ui/components/icons/icons.tsx'
import { T } from '@suddenlygiovanni/ui/components/typography/typography.tsx'
import { Accordion } from '@suddenlygiovanni/ui/ui/accordion.tsx'
import { Button } from '@suddenlygiovanni/ui/ui/button.tsx'

import { Experience } from './experience.tsx'

export function Experiences({
	work,
}: {
	readonly work: readonly Model.Work[]
}): ReactElement {
	const all = work.map((_, idx) => `experience-${idx}`)
	const none: string[] = []
	const initialState: string[] = all[0] ? [all[0]] : none

	const [value, setValue] = useState<string[]>(initialState)

	const toggleExperiences: MouseEventHandler<HTMLButtonElement> = _ => {
		setValue(prevState => (prevState.length > 0 ? none : all))
	}

	return (
		<section className="relative w-full">
			<T.h2 className="mb-0">Experience</T.h2>
			<Button
				className="absolute top-0 right-0 rounded-full"
				onClick={toggleExperiences}
				size="icon"
				variant="ghost"
			>
				{value.length === 0 ? <Icons.rowSpacing /> : <Icons.cross2 />}
				<span className="sr-only">Toggle experiences accordion</span>
			</Button>

			<Accordion
				className="w-full"
				onValueChange={setValue}
				type="multiple"
				value={value}
			>
				{work.map((work, idx) => (
					<Experience
						key={work.name}
						value={
							// biome-ignore lint/style/noNonNullAssertion: FIXME: move away from non-null assertion
							all.at(idx)!
						}
						{...work}
					/>
				))}
			</Accordion>
		</section>
	)
}
