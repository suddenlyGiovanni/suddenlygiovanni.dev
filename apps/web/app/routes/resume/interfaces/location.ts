import * as S from '@effect/schema/Schema'

export const Location = S.struct({
	address: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'address',
			description: 'Address line',
			examples: ['1234 Glücklichkeit Straße Hinterhaus 5. Etage li.'],
		},
	}),

	city: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'city',
			description: 'City',
			examples: ['Berlin', 'New York', 'San Francisco'],
		},
	}),

	countryCode: S.optional(S.string.pipe(S.trimmed(), S.length(2), S.uppercased()), {
		exact: true,
		annotations: {
			title: 'countryCode',
			description: 'Country code as per ISO-3166-1 ALPHA-2',
			examples: ['US', 'AU', 'IN'],
		},
	}),

	postalCode: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'postalCode',
			description: 'European postal code',
			examples: ['12209'],
		},
	}),

	region: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'region',
			description: 'The general region where you live. Can be a US state, or a province',
			examples: ['California', 'Quebec'],
		},
	}),
})

export type Location = S.Schema.To<typeof Location>
