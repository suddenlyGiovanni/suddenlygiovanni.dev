// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

import { UrlString } from './url-string.ts'

export const Meta = S.struct({
	/**
	 * URL (as per RFC 3986) to latest version of this document
	 */
	canonical: S.optional(
		UrlString.annotations({
			title: 'canonical',
			description: 'URL (as per RFC 3986) to latest version of this document',
		}),
		{ exact: true },
	),

	lastModified: S.optional(
		S.Date.annotations({
			title: 'lastModified',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: [new Date('2012-04-05T10:00:00.000Z')],
		}),
		{ exact: true },
	),

	version: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'version',
			description: 'A version field which follows semver - e.g. v1.0.0',
			examples: ['v1.0.0'],
		}),
		{ exact: true },
	),
})

/**
 * The schema version and any other tooling configuration lives here
 */
export type Meta = S.Schema.Encoded<typeof Meta>
