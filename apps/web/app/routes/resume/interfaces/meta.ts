import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Meta = S.struct({
	/**
	 * URL (as per RFC 3986) to latest version of this document
	 */
	canonical: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'canonical',
			description: 'URL (as per RFC 3986) to latest version of this document',
		},
	}),

	lastModified: S.optional(ISODateString, {
		annotations: {
			title: 'lastModified',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: ['2012-04-05T10:00:00.000Z'],
		},
	}),

	version: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'version',
			description: 'A version field which follows semver - e.g. v1.0.0',
			examples: ['v1.0.0'],
		},
	}),
})

/**
 * The schema version and any other tooling configuration lives here
 */
export interface Meta extends S.Schema.To<typeof Meta> {}
