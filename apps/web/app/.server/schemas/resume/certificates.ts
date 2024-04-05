import * as S from '@effect/schema/Schema'

import { UrlString } from './url-string.ts'

export const Certificate = S.struct({
	name: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'Name',
			description: 'name of the certificate',
			examples: ['e.g. Certified Kubernetes Administrator'],
		}),
		{ exact: true },
	),

	date: S.optional(
		S.Date.annotations({
			title: 'date',
			examples: [new Date('2018-01-01')],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'the url of the certificate',
			examples: ['http://example.com/cert.pdf'],
		}),
		{ exact: true },
	),

	issuer: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'issuer',
			description: 'issuer of the certificate',
			examples: ['e.g. CNCF'],
		}),
		{ exact: true },
	),
})

export type Certificate = S.Schema.Encoded<typeof Certificate>
