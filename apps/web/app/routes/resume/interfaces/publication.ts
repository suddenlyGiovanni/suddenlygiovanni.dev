import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Publication = S.struct({
	name: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'name',
			description: 'The name of the publication',
			examples: ['The World Wide Web'],
		},
	}),

	publisher: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'publisher',
			description: 'The publisher of the publication',
			examples: ['IEEE', 'Computer Magazine'],
		},
	}),

	releaseDate: S.optional(ISODateString, {
		exact: true,
		annotations: {
			title: 'releaseDate',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: ['2012-04-05', '2012-04-05T10:00:00.000Z'],
		},
	}),

	summary: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'summary',
			description: 'Short summary of publication',
			examples: ['Discussion of the World Wide Web, HTTP, HTML'],
		},
	}),

	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'URL (as per RFC 3986)',
			examples: ['http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
		},
	}),
})

export interface Publication extends S.Schema.To<typeof Publication> {}
