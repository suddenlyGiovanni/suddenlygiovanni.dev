// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { ISODateString } from './iso-date-string.ts'

export const Award = S.struct({
	awarder: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'awarder',
			description: 'The name of the award given',
			examples: ['Time Magazine'],
		},
	}),

	date: S.optional(ISODateString, {
		exact: true,
		annotations: {
			title: 'date',
			description: 'Date of the award',
			examples: ['1970-01-01T00:00:00.000Z'],
		},
	}),

	summary: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'summary',
			description: 'A brief summary of the award',
			examples: ['Received for my work with Quantum Physics'],
		},
	}),

	title: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'title',
			description: 'Title of the award',
			examples: ['One of the 100 greatest minds of the century'],
		},
	}),
})

export type Award = S.Schema.To<typeof Award>
