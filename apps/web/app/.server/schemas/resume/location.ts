import * as S from '@effect/schema/Schema'

export const Location = S.Struct({
	address: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'address',
			description: 'To add multiple address lines, use "\\n".',
			examples: ['1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.'],
		}),
		{ exact: true },
	),

	city: S.compose(S.Trim, S.NonEmpty).annotations({
		title: 'city',
		description: 'City',
		examples: ['Berlin', 'New York', 'San Francisco'],
	}),

	countryCode: S.compose(S.Trim, S.Uppercase)
		.pipe(S.length(2))
		.annotations({
			title: 'countryCode',
			description: 'Country code as per ISO-3166-1 ALPHA-2',
			examples: ['US', 'AU', 'IN'],
		}),

	postalCode: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'postalCode',
			description: 'European postal code',
			examples: ['12209'],
		}),
		{
			exact: true,
		},
	),

	region: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'region',
			description: 'The general region where you live. Can be a US state, or a province',
			examples: ['California', 'Quebec'],
		}),
		{ exact: true },
	),
})

export type Location = S.Schema.Encoded<typeof Location>
